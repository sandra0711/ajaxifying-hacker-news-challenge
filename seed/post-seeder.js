const mongoose = require('mongoose');
const Post = mongoose.model('Post');

const loremIpsum = require('knicklabs-lorem-ipsum.js');     // для генерирования текста-"рыбы", который часто используется для заполнения текстовых пространств, https://www.npmjs.com/package/lorem-ipsum

mongoose.connect('localhost:27017/hackernews');

async function seedBase() {
    for(let i = 0; i < 20; i++) {
        let newPost = new Post({
            title: loremIpsum({
                count: 4,
                units: 'words',
                format: 'plain',
                random: Math.random
            }),
            content:  loremIpsum({
                count: 3,
                units: 'sentences',
                format: 'plain',
                random: Math.random
            }),
            username: loremIpsum({
                count: 1,
                units: 'words',
                format: 'plain',
                random: Math.random
            }),
            commentCount: 0,
            createdAt: Date.now(),
            updatedAt: Date.now()
        });

        await newPost.save();
    }
}

seedBase();
mongoose.disconnect();
