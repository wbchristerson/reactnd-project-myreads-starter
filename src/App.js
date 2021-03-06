import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Shelves from './Shelves'
import Search from './Search'
import './App.css'

/* Note: A large portion of the code in this file and the supporting component files is based on the
  information provided in the videos and written text lessons for the FEND program/React Nanodegree
  program.
*/

class BooksApp extends React.Component {
  state = {
    currentPage: '/', // '/', '/search'
    bookObjData: [] // array of abridged book objects including attributes for id, shelf, title, author, and image url
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then((collectedBooks) => {
      this.setState({
        bookObjData: collectedBooks.map((book) => (
          {
            id: book.id,
            shelf: (book.hasOwnProperty("shelf") ? book.shelf : "none"),
            title: book.title,
            authors: (book.hasOwnProperty("authors") ? book.authors.join(", ") : ""),
            url: ((book.hasOwnProperty("imageLinks") && book.imageLinks.hasOwnProperty("thumbnail")) ?
                   book.imageLinks.thumbnail : "")
          }
        ))
      })
    })
  }

  // I needed a way to include the App instance itself and I had some trouble understanding how to bind 'this' correctly
  updateState(obj, data) {
    obj.setState({
      bookObjData: data
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <Shelves appRef={this} updateAppState={this.updateState} bookObjData={this.state.bookObjData}/>
        )}/>
        <Route path="/search" render={() => (
          <Search appRef={this} updateAppState={this.updateState} bookObjData={this.state.bookObjData}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
