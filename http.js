const axios = require('axios');
const { baseUrl } = require('./config');

let axiosInstance = axios.create({
  baseURL: baseUrl
});

/**
 *  Axios interception goes here
 */

module.exports = axiosInstance;
