import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Library from './Library.js'
import Search from './Search.js'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    books: {
      currentlyReading: [],
      wantToRead: [],
      read: []
    }
  }

  componentDidMount() {

    BooksAPI
      .getAll()
      .then((allBooks) => {

        const currentlyReading =  allBooks.filter(book => book.shelf === "currentlyReading")
        const wantToRead = allBooks.filter(book => book.shelf === "wantToRead")
        const read = allBooks.filter(book => book.shelf === "read")

        this.setState({
          books: {
            currentlyReading: currentlyReading,
            wantToRead: wantToRead,
            read: read
          }
        })

      })

  }

  moveBookToAnotherShelf = (book, shelf) => {
    BooksAPI
      .update(book, shelf)
      .then(booksByShelf => {
        BooksAPI
          .get(book.id)
          .then(result => {

            const newShelf = result.shelf
            const previousShelf = book.shelf
            const updatedBooks = {...this.state.books}

            if(previousShelf) {
              //remove from original shelf
              updatedBooks[previousShelf] = updatedBooks[previousShelf].filter((b) => b.id !== result.id)
            }
            if(newShelf !== "none") {
              //add to new shelf
              updatedBooks[newShelf] = updatedBooks[newShelf].concat([result])
            }
            this.setState({books: updatedBooks})
          })
      })
  }

  addBookToLibrary = (book, shelf) => {
    BooksAPI
      .update(book, shelf)
      .then(booksByShelf => {
            BooksAPI
              .get(book.id)
              .then(result => {
                const newShelf = result.shelf

                if(newShelf) {
                  const updatedBooks = {...this.state.books}
                  //add to new shelf
                  updatedBooks[newShelf] = updatedBooks[newShelf].concat([result])
                  this.setState({books:updatedBooks})
                }
              })

      })
  }

  render() {
    return (
      <div>
        <Route exact path="/" render={() => (
          <Library
            books={this.state.books}
            moveBook={this.moveBookToAnotherShelf}
          />
        )}/>
        <Route exact path="/search" render={({ history }) => (
          <Search
            addBook={this.addBookToLibrary}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
