const jwt = require('jsonwebtoken');

exports.signJwt = (id) => jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES
})

exports.verifyJwt = (token) => {
    const userId = jwt.verify(token, process.env.JWT_SECRET)
    return userId;
}