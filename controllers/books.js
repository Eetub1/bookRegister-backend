const booksRouter = require('express').Router()
const Book = require('../models/book')
const config = require('../utils/config')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

//function extracts a token from the request and then returns it
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

booksRouter.get('/', async (request, response) => {
  const books = await Book.find({})
  response.json(books)
})

booksRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), config.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const book = new Book({
      title: body.title,
      author: body.author,
      year: body.year,
      pages: body.pages
  })

  const savedBook = await book.save()

  response.status(201).json(savedBook)
})

module.exports = booksRouter