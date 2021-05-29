const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('Connected to Database')
})

module.exports = mongoose.connection;