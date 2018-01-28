import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class Book extends Component {
  static PropTypes = {
    book: PropTypes.object.isRequired,
    moveBook: PropTypes.func.isRequired,
    addBook: PropTypes.func.isRequired
  }

  state = {
    value: this.props.book.shelf ? this.props.book.shelf : 'none'
  }

  moveTo = (e) => {
    const shelf = e.target.value
    const book = this.props.book

    this.setState({value:shelf})

    if (this.props.moveBook) {
      this.props.moveBook(book, shelf)
    }

    if (this.props.addBook) {
      this.props.addBook(book, shelf)
    }
  }

  render() {
    const { book } = this.props
    const { moveBook } = this.props
    const { value } = this.state

    return (
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            {book.imageLinks && (
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
            )
            }
            <div className="book-shelf-changer">
              <select onChange={this.moveTo} value={value}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          {book.authors && (
            <div className="book-authors">{book.authors.map((author) => (
              <span key={author}>{author} </span>
            ))}</div>
          )}
        </div>
      </li>
    )
  }
}

export default Book
