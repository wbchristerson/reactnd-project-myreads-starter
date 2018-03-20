import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Shelves from './Shelves'
import Search from './Search'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    currentPage: '/', // '/', '/search'
    shelfRows: [[], [], []],
    shelfList: []
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("State JC: ", this.state.shelfList)
  }

  placeBooks = (collectedBooks) => {
    this.setState({
      shelfList: collectedBooks
    })
  }

  moveBook = (bookObj, oldShelf, newShelf) => {
    if (oldShelf !== newShelf) {
      let oldIndex = -1
      let newIndex = -1
      if (oldShelf === 'currentlyReading') {
        oldIndex = 0
      } else if (oldShelf === 'wantToRead') {
        oldIndex = 1
      } else if (oldShelf === 'read') {
        oldIndex = 2
      }

      if (newShelf === 'currentlyReading') {
        newIndex = 0
      } else if (newShelf === 'wantToRead') {
        newIndex = 1
      } else if (newShelf === 'read') {
        newIndex = 2
      }
      this.setState((prevState) => {
        if (oldIndex !== -1) {
          this.state.shelfRows[oldIndex].filter((book) => (book.id !== bookObj.id))
        }
        if (newIndex !== -1) {
          this.state.shelfRows[newIndex].push(bookObj)
        }
      })
    }
    console.log(this.state.shelfRows)
  }

  resetData = () => {
    BooksAPI.getAll()
    .then((collectedBooks) => {
      this.setState({
        shelfList: collectedBooks
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <Shelves updateRecord={this.resetData} shelfData={this.state.shelfList} moveToNewShelf={this.moveBook} acquireBooks={this.placeBooks}/>
        )}/>
        <Route path="/search" render={() => (
          <Search updateRecord={this.resetData} shelfData={this.state.shelfList} moveToNewShelf={this.moveBook}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
