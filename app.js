const express = require('express');
const app = express();
const logger = require('morgan');
const cors = require('cors');
const axios = require('axios');

// Configuration
const PORT = 3000;
const HOST = "localhost";
const API_SERVICE_URL = "https://public-api.wordpress.com/rest/v1.1/sites/107403796";

// logs out whatever happens
app.use(logger('dev'));
app.use(cors());

app.use('/:type', async function (req, res, next) {

  /**
   * Param Type can be a
   * Post, Tag, Category
   */
  const paramType = req && req.params && req.params.type;

  const query = req.query;
  console.log("query", query);
  const numberQuery = query.number || null;
  const offsetQuery = query.offset || null;
  const pageQuery = query.page || null;
  const categoryQuery = query.category || null;
  const tagQuery = query.tag || null;
  const postID = query.postID || null;

  try {
    let data;
    let url = postID ? `${API_SERVICE_URL}/${paramType}/${postID}` : `${API_SERVICE_URL}/${paramType}`;
    const response = await axios.get(`${url}`, {
      params: {
        number: numberQuery,
        offset: offsetQuery,
        page: pageQuery,
        category: categoryQuery,
        tag: tagQuery
      }
    });
    data = response.data;
    res.status(200).json(data);
  } catch (error) {
    console.log('err', error);
  }
});

app.listen(PORT, HOST, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});


module.exports = app;
