const express = require('express');
const mongoose = require('mongoose');
const Post = require('../models/post');
const { Vote } = require('../models/vote');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.redirect('/posts');
});

router.get('/posts', async function (req, res) {
  let posts = await Post.find();
  posts.sort(function(a, b) {
    return b.createdAt - a.createdAt;
  })
  res.render('index', { posts });
});

router.post('/posts/:id/vote', async function (req, res) {
  let post = await Post.findById(req.params.id);
  let vote = new Vote();
  post.votes.push(vote);
  await post.save();

  res.redirect('/posts');
});

router.delete('/:id', async function (req, res, next) {
  // Создайте здесь логику для удаления постов
});

router.post('/posts', async function (req, res) {
  let newPost = new Post({ title: req.body.title, username: 'User', commentCount: Math.floor(Math.random() * 1000) });
  await newPost.save();
  res.redirect('/posts');
});

router.get('/posts/:id', async function (req, res) {
  let post = await Post.findById(req.params.id);

  res.render('post', { post });
});

module.exports = router;
