const { mongoose, Schema } = require('../helpers/require')

const commentSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    upvote: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }],
    downvote: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    createdAt: Date
})

const Comment = mongoose.model('Answers', commentSchema)
module.exports = Comment