const HTTP = require('./http');

module.exports = {
  posts: (data) => {
    return HTTP.get("/posts", {
      params: {
        number: data.number || null,
        offset: data.offset || null,
        page: data.page || null,
        category: data.category || null,
        tag: data.tag || null
      }
    });
  },
  postById: (data) => {
    return HTTP.get(`/posts/${data.id}`);
  },
  relatedBlogPostById: (data) => {
    return HTTP.post(`/posts/${data.id}/related`);
  },
  categories: () => {
    return HTTP.get("/categories");
  },
  tags: () => {
    return HTTP.get("/tags");
  }
};
