const { mongoose, Schema } = require('../helpers/require')

const questionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    upvote: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }],
    downvote: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }],
    comment: [{
        type: Schema.Types.ObjectId,
        ref: 'Answers'
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    createdAt: Date
})

const Question = mongoose.model('Questions', questionSchema)
module.exports = Question