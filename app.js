const express = require('express');
const app = express();
const logger = require('morgan');
const cors = require('cors');

const api = require('./api');

// Configuration
const { port } = require('./config');
const { nodeEnv } = require('./config');
const HOST = "localhost";

// logs out whatever happens
app.use(logger('dev'));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to TrueBlogger Backend App!');
});

app.use('/posts/:postID/related', async function (req, res, next) {
  try {
    const postID = req && req.params && req.params.postID;
    const response = await api.relatedBlogPostById({ id: postID });
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
    const response = await api.postById({ id: postID });
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
  // /posts/7977                       - single post---------------DONE
  // /posts/7977/related               - related posts-------------DONE
  // /posts?category=tech              - posts of a category-------DONE
  // /posts?tag=iphone                 - posts of a tag------------DONE
  try {
    const query = req.query;
    const response = await api.posts(query);
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
    // const response = await axios.get(`${baseUrl}/categories`);
    const response = await api.categories();
    console.log("response", response);
    data = response.data;
    res.status(200).json(data);
  } catch (error) {
    console.log("error", error);
    const errorResponse = error && error.response && error.response;
    const errorStatus = errorResponse.status;
    const errorData = errorResponse.data;
    res.status(errorStatus).send(errorData);
  }
});

app.use('/tags', async function (req, res, next) {
  try {
    const response = await api.tags();
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
//     let url = postID ? `${baseUrl}/${paramType}/${postID}` : `${baseUrl}/${paramType}`;
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

app.listen(port, HOST, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
