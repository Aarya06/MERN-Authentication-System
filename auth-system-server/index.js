const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const mongoConnection = require('./config/mongoose.config');
const authRoutes = require('./routes/authRoutes');
const User = require('./models/user');
const isAuthenticated = require('./middlewares/isAuthenticated');

const app = express()
const port = process.env.PORT || 5000

app.use(cors({
    origin: process.env.FRONT_END,
    credentials: true
}))
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }))

app.get('/', isAuthenticated, (req, res, next) => {
    try {
        User.findById(req.user._id).then(user => {
            if(!user){
                res.status(404).json({
                    status: 'error',
                    msg: 'User not found'
                })
            }
            user.password = undefined;
            res.status(200).json({
                status: 'success',
                user
            })
        })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            msg: 'Internal Server Error'
        })
    }
})

app.use('/user', authRoutes)

mongoConnection.on('error', (err) => {
    console.log('Database connection failed', err)
})

app.listen(port, () => {
    console.log(`Server is Listening on port ${port}`)
})