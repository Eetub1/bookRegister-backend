const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const booksRouter = require('./controllers/books')

const app = express()
app.use(express.json())

mongoose.connect(config.MONGODB_URI)

app.use('/api/books', booksRouter)

module.exports = app