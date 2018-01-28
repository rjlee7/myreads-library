import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'

class Shelf extends Component {
  static PropTypes = {
    books: PropTypes.array.isRequired,
    onMoveBook: PropTypes.func.isRequired
  }

  render() {
    const { books } = this.props
    const { onMoveBook } = this.props

    const booksCurrentlyReading = books.filter(book => book.shelf === "currentlyReading")
    const booksWantToRead = books.filter(book => book.shelf === "wantToRead")
    const booksRead = books.filter(book => book.shelf === "read")

    console.log('booksCurrentlyReading',booksCurrentlyReading)
    console.log('booksWantToRead',booksWantToRead)
    console.log('booksRead',booksRead)

    console.log('books',this.props.books)

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {booksCurrentlyReading.map((book) => (
                    <Book key={book.id} book={book} onMoveBook={onMoveBook}/>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {booksWantToRead.map((book) => (
                    <Book key={book.id} book={book} onMoveBook={onMoveBook}/>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {booksRead.map((book) => (
                    <Book key={book.id} book={book} onMoveBook={onMoveBook}/>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default Shelf
