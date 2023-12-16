const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose
  .connect('mongodb://127.0.0.1:27017/blog_app')
  .then(() => {
    console.log('connected to mongodb');
  })
  .catch((err) => {
    console.error(err);
  });
const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Blog = mongoose.model('Blog', blogSchema);

app.use(express.json());
app.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (error) {
    res.end({ error: true, message: error.message });
  }
});
app.post('/blog', async (req, res) => {
  try {
    await Blog.create(req.body);
    res.send({ success: true, message: 'Blog created successfyly' });
  } catch (error) {
    res.end({ error: true, message: error.message });
  }
});

app.listen(3000, () => {
  console.log('server listening on port 3000');
});
