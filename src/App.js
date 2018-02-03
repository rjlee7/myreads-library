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
    },
    loading: true
  }

  shelves = {
    currentlyReading: "Currently Reading",
    wantToRead: "Want To Read",
    read: "Read"
  }

  componentDidMount() {

    BooksAPI
      .getAll()
      .then((allBooks) => {

        const currentlyReading =  allBooks.filter(book => book.shelf === "currentlyReading")
        const wantToRead = allBooks.filter(book => book.shelf === "wantToRead")
        const read = allBooks.filter(book => book.shelf === "read")

        this.setState({
          loading: false,
          books: {
            currentlyReading: currentlyReading,
            wantToRead: wantToRead,
            read: read
          }
        })

      })

  }

  getBookShelf = (bookId) => {
    return BooksAPI
      .get(bookId)
      .then(bookFound => {
        return bookFound.shelf
      })
  }

  //utility method
  move = (compareBook, booksList, previousShelf, newShelf) => {

    //remove from original shelf
    if(previousShelf && (previousShelf !== "none")) {
      booksList[previousShelf] = booksList[previousShelf].filter((b) => b.id !== compareBook.id)
    }

    //add to new shelf
    if(newShelf !== "none") {
      booksList[newShelf] = booksList[newShelf].concat([compareBook])
    }

  }

  //method to move one shelf to another within library
  moveBookToAnotherShelf = (book, shelf) => {
    const previousShelf = book.shelf
    const booksList = {...this.state.books}

    //if same shelf do nothing
    if(previousShelf === shelf) return;

    BooksAPI
      .update(book, shelf)
      .then(booksByShelf => {

        BooksAPI
          .get(book.id)
          .then(updatedBook => {

            const newShelf = updatedBook.shelf
            this.move(updatedBook, booksList, previousShelf, newShelf)
            this.setState({books: booksList})

          })

      })
  }

  //method to add book to library
  addBookToLibrary = (book, shelf) => {
    const booksList = {...this.state.books}

        const previousShelf = book.shelf

        //if same shelf do nothing
        if(previousShelf === shelf) return;

        BooksAPI
        .update(book, shelf)
        .then(booksByShelf => {
            const newShelf = shelf

            //set new shelf
            book.shelf = newShelf;
            this.move(book, booksList, previousShelf, newShelf)
            this.setState({books: booksList})

        })
  }

  render() {
    return (
      <div>
        <Route exact path="/" render={() => (
          <Library
            books={this.state.books}
            moveBook={this.moveBookToAnotherShelf}
            bookShelfTitles={this.shelves}
            getBookShelf={this.getBookShelf}
            loading={this.state.loading}
          />
        )}/>
        <Route exact path="/search" render={({ history }) => (
          <Search
            addBook={this.addBookToLibrary}
            getBookShelf={this.getBookShelf}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
