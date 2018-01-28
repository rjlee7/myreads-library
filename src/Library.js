import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

class Library extends Component {
  static PropTypes = {
    books: PropTypes.array.isRequired,
    moveBook: PropTypes.func.isRequired,
    bookShelfTitles: PropTypes.object.isRequired
  }

  render() {
    const { books } = this.props
    const { moveBook } = this.props
    const { bookShelfTitles } = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {Object.keys(books).map((shelfType) => {
              return (
                <BookShelf
                  key={shelfType}
                  bookShelfTitle={bookShelfTitles[shelfType]}
                  booksOnShelf={books[shelfType]}
                  moveBook={moveBook}
                />
              )
            })}
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
