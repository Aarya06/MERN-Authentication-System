exports.setCookie = (token, res) => {
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + 60 * 60 * 1000),
        httpOnly: true
    });
}

exports.deleteCookie = (key, value, res) => {
    res.cookie(key, value, {
        expires: new Date(Date.now())
    })
}