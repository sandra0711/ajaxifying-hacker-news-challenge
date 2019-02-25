const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = mongoose.Schema({
    title: String,
    content: String,
    username: String,
    commentCount: Number,
    votes:[{ type: Schema.Types.ObjectId, ref: 'Vote' }],
    createdAt: Date,
    updatedAt: Date
});

postSchema.pre('save', function (next) {
    let now = Date.now();

    this.updatedAt = now;
    // Set a value for createdAt only if it is null
    if (!this.createdAt) {
        this.createdAt = now
    }
    // Call the next function in the pre-save chain
    next()
});

const sum = (accumulator, currentValue) => accumulator + currentValue;
postSchema.methods.points = function() {
    return this.votes.reduce(sum, 0);
};

postSchema.methods.timeSinceCreation = function() {
    return Math.round((Date.now() - this.createdAt)/1000/60/60);
};


module.exports = mongoose.model('Post', postSchema);
