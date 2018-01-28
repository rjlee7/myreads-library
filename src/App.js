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
    const previousShelf = book.shelf

    //if same shelf do nothing
    if(previousShelf === shelf) return;

    BooksAPI
      .update(book, shelf)
      .then(booksByShelf => {

        BooksAPI
          .get(book.id)
          .then(updatedBook => {

            const newShelf = updatedBook.shelf
            const updatedBooks = {...this.state.books}

            //remove from original shelf
            if(previousShelf) {
              updatedBooks[previousShelf] = updatedBooks[previousShelf].filter((b) => b.id !== updatedBook.id)
            }

            //add to new shelf
            if(newShelf !== "none") {
              updatedBooks[newShelf] = updatedBooks[newShelf].concat([updatedBook])
            }
            this.setState({books: updatedBooks})

          })

      })
  }

  addBookToLibrary = (book, shelf) => {

    BooksAPI
    .get(book.id)
    .then(currentBook => {
      //if moving to the same shelf do nothing
      //if different shelf move
      const previousShelf = currentBook.shelf
      if(previousShelf === shelf) return;

      BooksAPI
      .update(currentBook, shelf)
      .then(booksByShelf => {

          const newShelf = shelf
          const updatedBooks = {...this.state.books}

          //remove from original shelf
          if(previousShelf) {
            updatedBooks[previousShelf] = updatedBooks[previousShelf].filter((b) => b.id !== currentBook.id)
          }

          //add to new shelf
          if(newShelf !== "none") {
            updatedBooks[newShelf] = updatedBooks[newShelf].concat([currentBook])
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
