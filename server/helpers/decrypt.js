const { bcryptjs } = require('./require')

module.exports = function check(password, hash) {
    return bcryptjs.compareSync(password, hash)
}