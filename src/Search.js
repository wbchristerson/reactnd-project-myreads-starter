import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class Search extends Component {
  state = {
    query: '',
    books: []
  }

  handleSearch = (q) => {
    this.setState({
      query: q
    })
    if (q === '') {
      this.setState({
        books: []
      })
    } else {
      BooksAPI.search(q)
      .then((booksFound) => {
        this.setState({
          books: booksFound
        })
      })
      .catch(() => {
        this.setState({
          books: []
        })
      })
    }
  }

  // If the book is on a shelf, return its shelf, otherwise return "none".
  getShelfState(book) {
    let matchingBooks = this.props.bookObjData.filter((bookObj) => (bookObj.id === book.id))
    if ((matchingBooks.length !== 0) && (matchingBooks[0].hasOwnProperty("shelf"))) {
      return matchingBooks[0].shelf
    }
    return "none"
  }

  /* I attempted to use the debounce method described by the previous reviewer, but I was not satisfied with how slow the
   * interactions were with the search page. I set the book search results to an empty array when the query is '' but the
   * problem of search results remaining when completely deleting a search item in a single key stroke persists. */
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
              onChange={() => this.handleSearch(this.textInput.value)}
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
