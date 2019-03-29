const {cron, kue} = require('./require'),
question = require('../models/question'),
mail = require('./mail'),
queue = kue.createQueue()

module.exports = () => {
    cron.schedule('00 08 * * 7', () => {
        question
        .find()
        .populate('userId')
        .then(function(allQuestion) {
            allQuestion.forEach(e => {
                let text = `Hello, ${e.userId.email}!<br>
                Your question for "${e.title}" has commented for ${e.comment.length} time(s).<br>
                Also your question been upvoted for ${e.upvote.length} time(s) and downvoted for ${e.downvote.length} time(s).<br>
                Thank you!`
                let email = e.userId.email
                queue.create('email', {
                    email,
                    text
                }).save()
            });
        })
        .catch(function (err) {
            console.log(err)
        })
        queue.process('email', function (job, done) {
            mail(job.data.email, job.data.text)
            done()
        })
    })
}