require('dotenv').config();

const PORT = process.env.PORT;

const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

const IN_PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = { IN_PRODUCTION, PORT, MONGODB_URI };
