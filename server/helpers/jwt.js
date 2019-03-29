const {jwt, env} = require('./require')

module.exports = {
    sign(emaiLogin) {
        return jwt.sign({email: emaiLogin}, process.env.SECRET)
    },
    verifying(token) {
        return jwt.verify(token, process.env.SECRET)
    }
}