const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose
  .connect('mongodb://127.0.0.1:27017/blog_app')
  .then(() => console.log('mongoose connected'))
  .catch((err) => console.log(err));

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
    res.send({ blogs });
  } catch (error) {
    res.end({ error: true, message: 'error occured' });
  }
});

app.post('/blog', async (req, res) => {
  try {
    await Blog.create(req.body);
    res.send({ success: true, message: 'blog created' });
  } catch (error) {
    res.end({ error: true, message: 'error occured' });
  }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
