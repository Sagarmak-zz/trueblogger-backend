const express = require('express');
const app = express();
const cors = require('cors');

const api = require('./api');

// Configuration
const { port } = require('./config');
const HOST = "localhost";

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
  try {
    const query = req.query;
    const response = await api.posts(query);
    data = response.data;
    res.status(200).json(data);
  } catch (error) {
    const errorResponse = error && error.response;
    const errorStatus = errorResponse.status;
    const errorData = errorResponse.data;
    res.status(errorStatus).send(errorData);
  }
});

app.use('/categories', async function (req, res, next) {
  try {
    // const response = await axios.get(`${baseUrl}/categories`);
    const response = await api.categories();
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

app.listen(port, HOST, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
