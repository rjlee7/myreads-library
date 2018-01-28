import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends Component {
  static PropTypes = {
    booksOnShelf: PropTypes.array.isRequired,
    moveBook: PropTypes.func.isRequired,
    bookShelfTitle: PropTypes.string.isRequired
  }

  render() {
    const { moveBook } = this.props
    const { bookShelfTitle } = this.props
    const { booksOnShelf } = this.props

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{bookShelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {(booksOnShelf && booksOnShelf.length) ? (
              booksOnShelf.map((book) => (
                <Book key={book.id} book={book} moveBook={moveBook}/>
              ))
            ) : (
              <div>Empty :)</div>
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
