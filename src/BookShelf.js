import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends Component {
  static propTypes = {
    booksOnShelf: PropTypes.array.isRequired,
    moveBook: PropTypes.func.isRequired,
    bookShelfTitle: PropTypes.string.isRequired,
    getBookShelf: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
  }

  render() {
    const { moveBook } = this.props
    const { bookShelfTitle } = this.props
    const { booksOnShelf } = this.props
    const { getBookShelf } = this.props
    const { loading } = this.props

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{bookShelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              loading ? (<div className="loader" style={{ width: 100, height: 100}}></div>)
              : ((booksOnShelf && booksOnShelf.length) ? (
                booksOnShelf.map((book) => (
                  <Book key={book.id} book={book} moveBook={moveBook} getBookShelf={getBookShelf}/>
                ))
              ) : (
                <div>Empty :)</div>
              ))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
