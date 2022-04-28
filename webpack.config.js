const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => {
  const { mode } = argv;
  const additionalPlugins =
    mode === 'production'
      ? [new CleanWebpackPlugin()]
      : [new webpack.HotModuleReplacementPlugin()]; // Enable hot module replacement

  const additionalEntries =
    mode === 'production'
      ? []
      : ['webpack-hot-middleware/client?http://localhost:3003'];

  return {
    mode,
    entry: ['./client/src', ...additionalEntries],
    output: {
      filename: 'main.[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: [/\.(js|jsx)$/],
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-env'],
            },
          },
        },
        {
          // Load CSS
          test: /\.css$/i,
          use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
          ],
        },
        {
          // Load other files
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          use: ['file-loader'],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.BUILT_AT': JSON.stringify(new Date().toISOString()),
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
      // Skip the part where we would make a html template
      new HtmlWebpackPlugin({
        template: 'client/public/index.html',
        favicon: path.resolve(__dirname, 'client/public/favicon.ico'),
      }),
      ...additionalPlugins,
    ],
  };
};
