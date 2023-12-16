const express = require('express');
const app = express();
const mongoose = require('mongoose');
const blogRouter = require('./routes/blog.route');

mongoose
  .connect('mongodb://127.0.0.1:27017/blog_app')
  .then(() => {
    console.log('connected to mongodb');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(express.json());
app.use(blogRouter);
app.listen(3000, () => {
  console.log('server listening on port 3000');
});
