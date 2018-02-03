import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  static PropTypes = {
    book: PropTypes.object.isRequired,
    moveBook: PropTypes.func.isRequired,
    addBook: PropTypes.func.isRequired,
    getBookShelf: PropTypes.func.isRequired
  }

  state = {
    value: "none"
  }

  componentDidMount() {
    //sometimes throws this error below...
    //warning.js:33 Warning: setState(...): Can only update a mounted or mounting component. This usually means you called setState() on an unmounted component. This is a no-op. Please check the code for the Book component.
    this.props.getBookShelf(this.props.book.id)
      .then(res=>{
        this.setState({value:res})
      })
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
            ) : null}
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
          {(book.authors) ? (
            <div className="book-authors">{book.authors.map((author) => (
              <span key={author}>{author} </span>
            ))}</div>
          ) : null}
        </div>
      </li>
    )
  }
}

export default Book
