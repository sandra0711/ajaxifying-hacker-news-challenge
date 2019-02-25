const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = mongoose.Schema({
    value: Number,
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
});

module.exports = mongoose.model('Vote', voteSchema);
