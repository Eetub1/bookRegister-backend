const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const booksRouter = require('./controllers/books')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const app = express()
app.use(express.json())

mongoose.connect(config.MONGODB_URI)

app.use('/api/books', booksRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

module.exports = app