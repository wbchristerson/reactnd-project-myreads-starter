import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class Search extends Component {
  state = {
    query: '',
    books: []
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.query !== prevState.query) {
  //     if (this.state.query.trim() === '') {
  //       this.setState( { books: [] })
  //     }
  //     else {
  //       BooksAPI.search(this.state.query.trim())
  //       .then((booksFound) => {
  //         this.setState( { books: booksFound })
  //       })
  //       .catch(() => {
  //         this.setState( { books: [] })
  //       })
  //     }
  //   }
  // }

  handleSearch = (q) => {
    this.setState({
      query: q
    })
    if (q === '') {
      this.setState({
        books: []
      })
    } else {
      console.log("Test 1")
      BooksAPI.search(q)
      .then((booksFound) => {
        console.log("Test 2")
        this.setState({
          books: booksFound
        })
      })
      .catch(() => {
        this.setState({
          books: []
        })
      })
      console.log("This: ", this)
    }
  }

  debounce = (func, wait, immediate) => {
  	var timeout;
  	return function() {
  		var context = this, args = arguments;
  		var later = function() {
  			timeout = null;
  			if (!immediate) func.apply(context, args);
  		};
  		var callNow = immediate && !timeout;
  		clearTimeout(timeout);
  		timeout = setTimeout(later, wait);
  		if (callNow) func.apply(context, args);
  	};
  }

  slowSearch = this.debounce(this.handleSearch, 30)

  // myEfficientFn = (q) => {
  //   debounce(function() {
  //     this.handleSearch(q)
  //   }, 250);
  // }

  // if the book is on a shelf, return its shelf, otherwise return "none"
  getShelfState(book) {
    let matchingBooks = this.props.bookObjData.filter((bookObj) => (bookObj.id === book.id))
    if ((matchingBooks.length !== 0) && (matchingBooks[0].hasOwnProperty("shelf"))) {
      return matchingBooks[0].shelf
    }
    return "none"
  }

  // onChange={() => this.handleSearch(this.textInput.value)}

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              ref={(input) => { this.textInput = input; }}
              onChange={() => this.slowSearch(this.textInput.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map((book) => (
                <Book
                  key={book.id}
                  bookId={book.id}
                  title={book.title}
                  shelf={this.getShelfState(book)}
                  authors={(book.hasOwnProperty("authors") ? book.authors.join(", ") : "")}
                  url={(book.hasOwnProperty("imageLinks") && book.imageLinks.hasOwnProperty("thumbnail") ?
                        book.imageLinks.thumbnail : "")}
                  updateAppState={this.props.updateAppState}
                  bookObjData={this.props.bookObjData}
                  appRef={this.props.appRef}
                />
              )
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
