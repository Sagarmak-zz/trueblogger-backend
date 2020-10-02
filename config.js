require('dotenv').config();

module.exports = {
  appTitle: process.env.NODE_APP_TITLE,
  baseUrl: process.env.NODE_APP_API_URL,
  port: process.env.NODE_APP_PORT
};
