const express = require('express');
const app = express();
const mongoose = require('mongoose');
const blogRouter = require('./routes/blog.route');
const config = require('./config/config');
mongoose
  .connect(config.dbConnection)
  .then(() => {
    console.log('connected to mongodb');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(express.json());
app.use(blogRouter);
app.listen(config.port, () => {
  console.log(`server listening on port ${config.port}`);
});
