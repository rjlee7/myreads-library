import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Shelf from './Shelf.js'
import Search from './Search.js'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    books: [],
    searchResult: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  moveBook = (book, shelf) => {
    this.setState((state) => {
      books: state.books.map((b) => {
        if(b.id === book.id) {
          b.shelf = shelf
          return b;
        } else {
          return b;
        }
      })
    })
    // 
    // this.setState((state) => {
    //   books: state.books.concat([book])
    // })

    BooksAPI.update(book, shelf)
  }

  searchBooks = (query) => {
    BooksAPI.search(query).then((searchResult) => {
      this.setState({ searchResult })
    })
  }

  render() {
    return (
      <div>
        <Route exact path="/" render={() => (
          <Shelf
            books={this.state.books}
            onMoveBook={this.moveBook}
          />
        )}/>
        <Route exact path="/search" render={({ history }) => (
          <Search
            searchResult={this.state.searchResult}
            searchBooks={this.searchBooks}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
