import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Shelf from './shelf.js'
import Search from './search.js'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    books: []
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

    BooksAPI.update(book, shelf)
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
          <Search />
        )}/>
      </div>
    )
  }
}

export default BooksApp
