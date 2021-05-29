const User = require('../models/user');
const { hashPassword, comparePassword } = require('../utils/bcrypt');
const { setCookie, deleteCookie } = require('../utils/cookie');
const { signJwt } = require('../utils/jwt');

exports.signup = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await hashPassword(password);
        User.create({ email, password: hashedPassword }).then(user => {
            user.password = undefined;
            const token = signJwt(user._id);
            setCookie(token, res);
            res.status(201).json({
                status: 'success',
                user
            })
        }).catch(err => {

            res.status(400).json({
                status: 'error',
                msg: err.message
            })

        })

    } catch (err) {
        res.status(500).json({
            status: 'error',
            msg: 'Internal Server Error'
        })
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        User.findOne({ email }).then(async user => {
            if (!user) {
                res.status(400).json({
                    status: 'error',
                    msg: 'invalid email or password'
                })
            }
            const matched = await comparePassword(password, user.password);
            if (!matched) {
                res.status(400).json({
                    status: 'error',
                    msg: 'invalid email or password'
                })
            }
            user.password = undefined;
            const token = signJwt(user._id)
            setCookie(token, res);
            res.status(200).json({
                status: 'success',
                user: user
            })
        }).catch(err => {
            res.status(400).json({
                status: 'error',
                msg: err.message
            })
        })

    } catch (error) {
        res.status(500).json({
            status: 'error',
            msg: 'Internal Server Error'
        })
    }
}

exports.logout = async (req, res, next) => {
    try {
        deleteCookie('jwt', 'expiredToken', res);
        res.status(200).json({
            status: 'success'
        })

    } catch (error) {
        res.status(500).json({
            status: 'error',
            msg: 'Internal Server Error'
        })
    }
}