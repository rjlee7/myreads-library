import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'
import _ from 'underscore'

class Search extends Component {
  static PropTypes = {
    searchResult: PropTypes.array.isRequired,
    searchBooks: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
    this.props.searchBooks(this.state.query)
  }

  render() {
    const { query } = this.state
    const { searchResult } = this.props
    const { searchBooks } = this.props
    const { moveBook } = this.props

    console.log('searchResult',searchResult)
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">

            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => _.debounce(this.updateQuery(event.target.value),300)}
            />

          </div>
        </div>
        <div className="search-books-results">
          {searchResult &&
          (<ol className="books-grid">
            {searchResult.map((book) => (
              <Book key={book.id} book={book} moveBook={moveBook}/>
            ))}
          </ol>)}
          {!searchResult && (
            <div>No results</div>
          )}
        </div>
      </div>
    )
  }
}

export default Search
