import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import _ from 'underscore'

class Search extends Component {

  state = {
    query: '',
    searchResult: [],
    loading: false
  }

  searchBooks = (query) => {
    BooksAPI
      .search(query)
      .then((searchResult) => {
        this.setState({
          searchResult: searchResult,
          loading: true
        })
      })
  }

  updateQuery = (query) => {
        this.setState({ query: query.trim() })
        if(query) {
          this.searchBooks(query)
        }
  }

  render() {
    const { query } = this.state
    const { searchResult } = this.state
    const { addBook } = this.props
    const { getBookShelf } = this.props
    const { loading } = this.props
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
          <ol className="books-grid">
            {loading ? <div className="loader" style={{ width: 100, height: 100}}></div> : (
              (searchResult && searchResult.length > 0) && (
                searchResult.map((book) => (
                  <Book key={book.id} book={book} addBook={addBook} getBookShelf={getBookShelf}/>
                ))
              )
            )}
          </ol>
          {(!searchResult || (searchResult && searchResult.error)) &&
            <div>No results</div>
          }
        </div>
      </div>
    )
  }
}

export default Search
