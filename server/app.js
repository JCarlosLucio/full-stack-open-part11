const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const path = require('path');
const chokidar = require('chokidar');
require('express-async-errors');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const usersRouter = require('./controllers/users');
const blogsRouter = require('./controllers/blogs');
const loginRouter = require('./controllers/login');
const app = express();

logger.info('connecting to DB');

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info('connected to mongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to mongoDB', error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/blogs', blogsRouter);

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}

/**
 *  Use "hot loading" in backend
 */
const watcher = chokidar.watch('server'); // Watch server folder
watcher.on('ready', () => {
  watcher.on('all', () => {
    Object.keys(require.cache).forEach((id) => {
      if (id.includes('server')) delete require.cache[id]; // Delete all require caches that point to server folder (*)
    });
  });
});

logger.info(`Running in production: ${config.IN_PRODUCTION}`);

/**
 * For frontend use hot loading when in development, else serve the static content
 */
if (!config.IN_PRODUCTION) {
  const webpack = require('webpack');
  const middleware = require('webpack-dev-middleware');
  const hotMiddleWare = require('webpack-hot-middleware');
  const webpackConf = require('../webpack.config');

  const compiler = webpack(webpackConf('development', { mode: 'development' }));

  const devMiddleware = middleware(compiler);
  app.use(devMiddleware);
  app.use(hotMiddleWare(compiler));
  app.use('*', (req, res, next) => {
    const filename = path.join(compiler.outputPath, 'index.html');
    devMiddleware.waitUntilValid(() => {
      compiler.outputFileSystem.readFile(filename, (err, result) => {
        if (err) return next(err);
        res.set('content-type', 'text/html');
        res.send(result);
        return res.end();
      });
    });
  });
} else {
  const DIST_PATH = path.resolve(__dirname, '../dist');
  const INDEX_PATH = path.resolve(DIST_PATH, 'index.html');
  app.use(express.static(DIST_PATH));
  app.get('*', (req, res) => res.sendFile(INDEX_PATH));
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
