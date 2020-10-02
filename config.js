require('custom-env').env('development');

module.exports = {
  nodeEnv: process.env.NODE_APP_ENV,
  appTitle: process.env.NODE_APP_TITLE,
  baseUrl: process.env.NODE_APP_API_URL,
  port: process.env.NODE_APP_PORT
};
