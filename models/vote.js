const mongoose = require('mongoose');

const voteSchema = mongoose.Schema({
    value: { type: Number, default: 1 },
    // post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
});

module.exports = {
    voteSchema,
    Vote: mongoose.model('Vote', voteSchema)
};
