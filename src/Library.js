import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'

class Library extends Component {
  static PropTypes = {
    books: PropTypes.array.isRequired,
    moveBook: PropTypes.func.isRequired
  }

  render() {
    const { books } = this.props
    const { moveBook } = this.props
    const { currentlyReading } = this.props.books
    const { wantToRead } = this.props.books
    const { read } = this.props.books

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
                  {currentlyReading.length ? (
                    currentlyReading.map((book) => (
                      <Book key={book.id} book={book} moveBook={moveBook}/>
                    ))
                  ) : (
                    <div>Empty :)</div>
                  )}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {wantToRead.length ? (
                    wantToRead.map((book) => (
                      <Book key={book.id} book={book} moveBook={moveBook}/>
                    ))
                  ) : (
                      <div>Empty :)</div>
                  )}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {read.length ? (
                    read.map((book) => (
                      <Book key={book.id} book={book} moveBook={moveBook}/>
                    ))
                  ) : (
                    <div>Empty :)</div>
                  )}
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

export default Library
