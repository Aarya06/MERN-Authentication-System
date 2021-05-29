const User = require("../models/user");
const { verifyJwt } = require("../utils/jwt");

module.exports = async (req, res, next) => {
    let token;
    if (req.cookies) {
        token = req.cookies.jwt
    }
    if (!token) {
        return res.status(401).json({
            status: 'error',
            msg: 'You are not authorized'
        })
    }
    const currentUser = verifyJwt(token);
    await User.findById(currentUser.id).then(user => {
        if (!user) {
            return res.status(401).json({
                status: 'error',
                msg: 'You are not authorized'
            })
        }
        req.user = user
    })
    next()
}