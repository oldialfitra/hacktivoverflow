const question = require('../models/question')

class Question {
    static postQuestion(req, res) {
        question
            .create({
                title: req.body.title,
                description: req.body.description,
                upvote: [],
                downvote: [],
                comments: [],
                userId: req.body.userId,
                createdAt: new Date()
            })
            .then(function (newQuestion) {
                res.status(201).json(newQuestion)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }

    static getAllPost(req, res) {
        question.find().sort({ createdAt: -1 })
            .populate('upvote')
            .populate('downvote')
            .populate('comment')
            .populate('userId')
            .then(function (posts) {
                console.log(posts)
                res.status(200).json(posts)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }

    static updatePost(req, res) {
        question
            .findByIdAndUpdate(req.params.id, {
                $set: req.body
            })
            .then(function (post) {
                res.status(200).json(post)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }

    static deletePost(req, res) {
        question
            .findByIdAndDelete(req.params.id)
            .then(function (post) {
                res.status(200).json(post)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }

    static getOnePost(req, res) {
        console.log('masuk ke controller get one')
        question
            .findById(req.params.id)
            .populate('upvote')
            .populate('downvote')
            .populate('comment')
            .populate('userId')
            .then(function (onePost) {
                console.log('masuk ke controller get one then')
                res.status(200).json(onePost)
            })
            .catch(function (err) {
                res.status(500).json(err)
            })
    }

    static upvotePost(req, res) {
        console.log('masuk ke up')
        question
            .findById(req.params.id)
            .then(function (onePost) {
                let flagUp = true
                console.log('masuk ke then')
                let vote = {
                    oneUpvote: onePost.upvote,
                    oneDownvote: onePost.downvote
                }
                if (vote.oneUpvote.length > 0) {
                    console.log('masuk ke if pertama')
                    for (let i = 0; i < vote.oneUpvote.length; i++) {
                        if (JSON.stringify(vote.oneUpvote[i]) === JSON.stringify(req.body.userId)) {
                            flagUp = false
                            break
                        }
                    }
                    console.log(flagUp)
                    if (flagUp === false) {
                        throw({
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
                return question.findByIdAndUpdate(req.params.id, {
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
        question
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
                        throw({
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
                return question.findByIdAndUpdate(req.params.id, {
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

module.exports = Question