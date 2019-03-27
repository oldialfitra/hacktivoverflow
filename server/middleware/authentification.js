// const {verifying} = require('../helpers/jwt')
const {jwt} = require('../helpers/require')
module.exports = (req, res, next) => {
    console.log('masuk ke middleware')
    if (req.headers.token) {
        try {
            console.log('masuk ke middleware bagian try')
            // req.userLoggedIn = verifying(req.headers.token)
            req.userLoggedIn = jwt.verify(req.headers.token, process.env.SECRET)
            next();
        } catch {
            console.log('masuk ke middleware catch')
            res.status(401).json({ message: `Login first` })
        }
    }
}