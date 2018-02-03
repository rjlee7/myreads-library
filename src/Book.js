import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired
  }

  state = {
    value: this.props.book.shelf
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
    const { value } = this.state

    return (
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            {(book.imageLinks && book.imageLinks.smallThumbnail) ? (
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
            ) : <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(http://via.placeholder.com/128x193?text=No%20Cover)` }}></div>
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
            <div className="book-authors">{book.authors ? book.authors.join(', ') : ''}</div>
        </div>
      </li>
    )
  }
}

export default Book
