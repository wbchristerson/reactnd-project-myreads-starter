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
    // console.log("Previous Query: " + prevState.query)
    // console.log("Current Query: " + this.state.query)
    if (this.state.query !== prevState.query) {
      if (this.state.query.trim() === '') {
        this.setState( { books: [] })
      }
      else {
        BooksAPI.search(this.state.query.trim())
        .then((booksFound) => {
          this.setState( { books: booksFound })
          // console.log("Books: ", booksFound)
        })
        .catch(() => {
          this.setState( { books: [] })
        })
      }
      // BooksAPI.search('arc').then((booksFound) => this.setState({ books: booksFound })).catch(console.log("This failed."))
    }
    // if (!((this.state.query === prevState.query) && (this.state.books === prevState.books))) {
    //   if (this.state.query !== '') {
    //     BooksAPI.search(this.state.query).then((booksFound) => {
    //       this.setState( { books: booksFound } )
    //     }).catch(console.log("no"))
    //   } else {
    //     this.setState({
    //       books: []
    //     })
    //   }
    // }
  }

  updateQuery = (query) => {
    this.setState({ query: query})
    // this.setState({ query: query.trim() })
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
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
                  key={book.id}
                  title={book.title}
                  author={(book.hasOwnProperty("authors") ? book.authors.join(", ") : "")}
                  url={(book.hasOwnProperty("imageLinks") && book.imageLinks.hasOwnProperty("thumbnail") ?
                        book.imageLinks.thumbnail : "")}/>
              )
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
