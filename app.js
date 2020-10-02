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

app.use('/posts/:postID/related', async function (req, res, next) {
  try {
    const postID = req && req.params && req.params.postID;
    const response = await axios.post(`${API_SERVICE_URL}/posts/${postID}/related`);
    data = response.data;
    res.status(200).json(data);
  } catch (error) {
    const errorResponse = error && error.response && error.response;
    const errorStatus = errorResponse.status;
    const errorData = errorResponse.data;
    res.status(errorStatus).send(errorData);
  }
});

app.use('/posts/:postID', async function (req, res, next) {
  try {
    const postID = req && req.params && req.params.postID;
    const response = await axios.get(`${API_SERVICE_URL}/posts/${postID}`);
    data = response.data;
    res.send(data);
  } catch (error) {
    const errorResponse = error && error.response && error.response;
    const errorStatus = errorResponse.status;
    const errorData = errorResponse.data;
    res.status(errorStatus).send(errorData);
  }
});

app.use('/posts', async function (req, res, next) {
  // /posts                            - all posts-----------------DONE
  // /posts?number=25&offset=0&page=1  - top 25 posts--------------DONE
  // /posts/?number=4&offset=25        - next 4 posts--------------DONE
  // /posts/7977                       - single post
  // /posts/7977/related               - related posts
  // /posts?category=tech              - posts of a category-------DONE
  // /posts?tag=iphone                 - posts of a tag------------DONE
  try {

    const query = req.query;
    const numberQuery = query.number || null;
    const offsetQuery = query.offset || null;
    const pageQuery = query.page || null;
    const categoryQuery = query.category || null;
    const tagQuery = query.tag || null;

    const response = await axios.get(`${API_SERVICE_URL}/posts`, {
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
    const errorResponse = error && error.response && error.response;
    const errorStatus = errorResponse.status;
    const errorData = errorResponse.data;
    res.status(errorStatus).send(errorData);
  }
});

app.use('/categories', async function (req, res, next) {
  try {
    const response = await axios.get(`${API_SERVICE_URL}/categories`);
    data = response.data;
    res.status(200).json(data);
  } catch (error) {
    const errorResponse = error && error.response && error.response;
    const errorStatus = errorResponse.status;
    const errorData = errorResponse.data;
    res.status(errorStatus).send(errorData);
  }
});

app.use('/tags', async function (req, res, next) {
  try {
    const response = await axios.get(`${API_SERVICE_URL}/tags`);
    data = response.data;
    res.status(200).json(data);
  } catch (error) {
    const errorResponse = error && error.response && error.response;
    const errorStatus = errorResponse.status;
    const errorData = errorResponse.data;
    res.status(errorStatus).send(errorData);
  }
});

// app.use('/:type', async function (req, res, next) {

//   /**
//    * Param Type can be a
//    * Post, Tag, Category
//    */
//   const paramType = req && req.params && req.params.type;

//   const query = req.query;
//   console.log("query", query);
//   const numberQuery = query.number || null;
//   const offsetQuery = query.offset || null;
//   const pageQuery = query.page || null;
//   const categoryQuery = query.category || null;
//   const tagQuery = query.tag || null;
//   const postID = query.postID || null;

//   try {
//     let data;
//     let url = postID ? `${API_SERVICE_URL}/${paramType}/${postID}` : `${API_SERVICE_URL}/${paramType}`;
//     const response = await axios.get(`${url}`, {
//       params: {
//         number: numberQuery,
//         offset: offsetQuery,
//         page: pageQuery,
//         category: categoryQuery,
//         tag: tagQuery
//       }
//     });
//     data = response.data;
//     res.status(200).json(data);
//   } catch (error) {
//     console.log('err', error);
//   }
// });

app.listen(PORT, HOST, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

module.exports = app;
