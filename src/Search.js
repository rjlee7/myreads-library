import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import { DebounceInput } from 'react-debounce-input'

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
        if(searchResult.length > 0) {
          const updatedSearchResult = searchResult.map(book => {
            return this.props.getBookShelf(book.id).then(res =>{
              book.shelf = res
              return book
            })
          })
          return Promise.all(updatedSearchResult)
            .then(books => {
              this.setState({
                searchResult: books,
                loading: true
              })
            })
        }
      })
  }

  updateQuery = (query) => {
      if(query) {
        this.searchBooks(query)
      } else {
        this.setState({ searchResult: [] })
      }
  }

  render() {
    const { searchResult } = this.state
    const { addBook } = this.props
    const { loading } = this.props
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <DebounceInput
              minLength={1}
              debounceTimeout={300}
              type="text"
              placeholder="Search by title or author"
              onChange={event => this.updateQuery(event.target.value)} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {loading ? <div className="loader" style={{ width: 100, height: 100}}></div> : (
              (searchResult && searchResult.length > 0) && (
                searchResult.map((book) => (
                  <Book key={book.id} book={book} addBook={addBook}/>
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
