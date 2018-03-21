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
    bookData: []
  }

  componentWillMount() {
    BooksAPI.getAll()
    .then((collectedBooks) => {
      this.setState({
        bookData: collectedBooks
      })
    })
  }

  updateBookData = () => {
    BooksAPI.getAll().then((collectedBooks) => {
      this.setState({
        bookData: collectedBooks
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <Shelves updateBookData={this.updateBookData} bookData={this.state.bookData}/>
        )}/>
        <Route path="/search" render={() => (
          <Search updateBookData={this.updateBookData} bookData={this.state.bookData}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
