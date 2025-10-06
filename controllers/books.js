const booksRouter = require('express').Router()
const Book = require('../models/book')

booksRouter.get('/', async (request, response) => {
    const books = await Book.find({})
    response.json(books)
    //response.send("Morojes")
})

booksRouter.post('/', async (request, response) => {
    const body = request.body

    console.log(body)

    const book = new Book({
        title: body.title,
        author: body.author,
        year: body.year
    })

    const savedBook = await book.save()

    response.status(201).json(savedBook)
})

module.exports = booksRouter