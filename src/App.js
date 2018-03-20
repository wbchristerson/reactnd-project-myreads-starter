import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Shelves from './Shelves'
import Search from './Search'
import './App.css'

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
