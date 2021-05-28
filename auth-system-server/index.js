const dotenv = require('dotenv');
dotenv.config();
const express = require('express');

const app = express()
const port = process.env.PORT

app.get('/', (req, res, next) => {
    res.send('Authentication System')
})

app.listen(port, () => {
    console.log(`Server is Listening on port ${port}`)
})