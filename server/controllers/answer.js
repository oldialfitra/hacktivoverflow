const answer = require('../models/answer'),
question = require('../models/question')

class Answer {

    static createAnswer(req, res) {
        console.log('masuk ke creat answer')
        answer
            .create({
                title: req.body.title,
                description: req.body.description,
                upvote: [],
                downvote: [],
                userId: req.body.userId,
                createdAt: new Date()
            })
            .then(function (newAnswer) {
                console.log(newAnswer)
                console.log('masuk ke then answer')
                console.log(req.params)
                return question.findByIdAndUpdate(req.params.id, {
                    $push: {
                        comment: newAnswer._id
                    }
                })
            })
            .then(function (newAnswer) {
                res.status(200).json(newAnswer)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }

    static updateAnswer(req, res) {
        answer
        .findByIdAndUpdate(req.params.id, {
            $set: req.body
        })
        .then(function (answer) {
            res.status(200).json(answer)
        })
        .catch(function (err) {
            res.status(500).json(err)
        })
    }

    static deleteAnswer(req, res) {
        answer
        .findByIdAndDelete(req.params.id)
        .then(function (answer) {
            res.status(200).json(answer)
        })
        .catch(function (err) {
            res.status(500).json(err)
        })
    }

    static getOneAnswer(req, res) {
        console.log('masuk ke one get answer')
        answer
        .findById(req.params.id)
        .then(function (oneAnswer) {
            console.log('masuk ke then one anser')
            res.status(200).json(oneAnswer)
        })
        .catch(function (err) {
            res.status(500).json(err)
        })
    }

    static getAllAnswer(req, res) {
        answer
        .find()
        .then(function (allAnswers) {
            res.status(200).json(allAnswers)
        })
        .catch(function (err) {
            res.status(500).json(err)
        })
    }

    static upvotePost(req, res) {
        let flagUp = true
        answer
            .findById(req.params.id)
            .then(function (onePost) {
                let vote = {
                    oneUpvote: onePost.upvote,
                    oneDownvote: onePost.downvote
                }
                if (vote.oneUpvote.length > 0) {
                    for (let i = 0; i < vote.oneUpvote.length; i++) {
                        if (JSON.stringify(vote.oneUpvote[i]) === JSON.stringify(req.body.userId)) {
                            flagUp = false
                            break
                        }
                    }
                    if (flagUp === false) {
                        res.status(400).json({
                            message: `You already upvote this post`
                        })
                    }
                    else {
                        vote.oneUpvote.push(req.body.userId)
                        return vote
                    }
                }
                else {
                    vote.oneUpvote.push(req.body.userId)
                    return vote
                }
            })
            .then(function (vote) {
                if (vote.oneDownvote.length > 0) {
                    for (let i = 0; i < vote.oneDownvote.length; i++) {
                        if (JSON.stringify(vote.oneDownvote[i]) === JSON.stringify(req.body.userId)) {
                            vote.oneDownvote.splice(i, 1)
                        }
                    }
                }
                return answer.findByIdAndUpdate(req.params.id, {
                    upvote: vote.oneUpvote,
                    downvote: vote.oneDownvote
                })
            })
            .then(function (post) {
                res.status(200).json(post)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }

    static downvotePost(req, res) {
        let flagUp = true
        answer
            .findById(req.params.id)
            .then(function (onePost) {
                let vote = {
                    oneUpvote: onePost.upvote,
                    oneDownvote: onePost.downvote
                }
                if (vote.oneDownvote.length > 0) {
                    for (let i = 0; i < vote.oneDownvote.length; i++) {
                        if (JSON.stringify(vote.oneDownvote[i]) === JSON.stringify(req.body.userId)) {
                            flagUp = false
                            break
                        }
                    }
                    if (!flagUp) {
                        res.status(400).json({
                            message: `You already downvote this post`
                        })
                    }
                    else {
                        vote.oneDownvote.push(req.body.userId)
                        return vote
                    }
                }
                else {
                    vote.oneDownvote.push(req.body.userId)
                    return vote
                }
            })
            .then(function (vote) {
                if (vote.oneUpvote.length > 0) {
                    for (let i = 0; i < vote.oneUpvote.length; i++) {
                        if (JSON.stringify(vote.oneUpvote[i]) === JSON.stringify(req.body.userId)) {
                            vote.oneUpvote.splice(i, 1)
                        }
                    }
                }
                return answer.findByIdAndUpdate(req.params.id, {
                    upvote: vote.oneUpvote,
                    downvote: vote.oneDownvote
                })
            })
            .then(function (post) {
                res.status(200).json(post)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }

}

module.exports = Answer