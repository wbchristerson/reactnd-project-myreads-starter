import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class Search extends Component {
  state = {
    query: '',
    books: []
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.query !== prevState.query) {
      if (this.state.query.trim() === '') {
        this.setState( { books: [] })
      }
      else {
        BooksAPI.search(this.state.query.trim())
        .then((booksFound) => {
          this.setState( { books: booksFound })
        })
        .catch(() => {
          this.setState( { books: [] })
        })
      }
    }
  }

  updateQuery = (query) => {
    this.setState({ query: query})
  }

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
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map((book) => (
                <Book
                  help={book}
                  key={book.id}
                  bookId={book.id}
                  title={book.title}
                  author={(book.hasOwnProperty("authors") ? book.authors.join(", ") : "")}
                  url={(book.hasOwnProperty("imageLinks") && book.imageLinks.hasOwnProperty("thumbnail") ?
                        book.imageLinks.thumbnail : "")}
                  updateBookData={this.props.updateBookData}
                  bookData={this.props.bookData}
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
