const {env} = require('../helpers/require'),
decrypt = require('../helpers/decrypt'),
user = require('../models/user'),
{sign} = require('../helpers/jwt')

class User {

    static registerUser(req, res) {
        console.log('masuk ke regis')
        console.log(req.body)
        user.create({
            email: req.body.email,
            password: req.body.password
        })
        .then(function (newUser) {
            console.log('masuk ke regis 2')
            res.status(201).json(newUser)
        })
        .catch(function (err) {
            res.status(500).json(err)
        })
    }

    static loginUser(req, res) {
        user.findOne({
            email: req.body.email
        })
        .then(function (uLogin) {
            if (!uLogin) {
                res.status(404).json({
                    message: 'Email / password wrong'
                })
            }
            else {
                if (!decrypt(req.body.password, uLogin.password)) {
                    res.status(404).json({
                        message: 'Email / password wrong'
                    })
                }
                else {
                    let token = sign(uLogin.email)
                    let obj = {
                        token,
                        id: uLogin._id
                    }
                    res.status(200).json(obj)
                }
            }
        })
    }

}

module.exports = User