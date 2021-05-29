const bcrypt = require('bcrypt');

exports.hashPassword = async (password) => await bcrypt.hash(password, 12)

exports.comparePassword = async (enteredPassword, savedPassword) => await bcrypt.compare(enteredPassword, savedPassword)