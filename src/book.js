import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class Book extends Component {
  static PropTypes = {
    book: PropTypes.object.isRequired,
    moveTo: PropTypes.func.isRequired
  }

  state = {
    value: this.props.book.shelf
  }

  moveTo = (e) => {
    e.preventDefault()
    const shelf = e.target.value
    const book = this.props.book
    console.log('shelf',shelf)
    console.log('book',book)
    if (this.props.onMoveBook)
      this.props.onMoveBook(book, shelf)
  }

  render() {
    const { book } = this.props
    const { onMoveBook } = this.props
    const { value } = this.state

    return (
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
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
          <div className="book-authors">{book.authors.map((author) => (
            <span key={author}>{author} </span>
          ))}</div>
        </div>
      </li>
    )
  }
}

export default Book
