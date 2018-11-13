var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const voteSchema = mongoose.Schema({
    value: Number,
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
});

module.exports = mongoose.model('Vote', voteSchema);