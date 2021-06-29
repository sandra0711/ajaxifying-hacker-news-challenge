const express = require('express');
const mongoose = require('mongoose');
const post = require('../models/post');
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

  res.json({ username: post.username , points: post.points(), timeSinceCreation: post.timeSinceCreation(), commentCount: post.commentCount, });
});

router.delete('/:id', async function (req, res, next) {
  let post = await Post.findById(req.params.id).deleteOne();
  res.json(post);
  
});

router.post('/posts/new', async function (req, res, next) {
  let newPost = new Post({ title: req.body.title, username: 'User', commentCount: Math.floor(Math.random() * 1000) });
  await newPost.save();
  res.json({ id: newPost._id, title: newPost.title, username: newPost.username, votes: [], points: 0, timeSinceCreation: newPost.timeSinceCreation(), commentCount: newPost.commentCount } );
 
});

router.get('/posts/:id', async function (req, res) {
  let post = await Post.findById(req.params.id);

  res.redirect('/posts');
});

module.exports = router;
