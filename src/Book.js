import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'

class Book extends Component {
  state = {
    shelf: 'none'
  }

  handleChange(event) {
    let newShelf = event.target.value
    let book
    BooksAPI.get(this.props.bookId)
    .then((foundBook) => {
      book = foundBook
    })
    .then(() => {
      let matchedBooks = this.props.bookData.filter((newBook) => (newBook.id === book.id))
      console.log("TEST: ", matchedBooks.length)
      if ((matchedBooks.length === 0) || (matchedBooks[0].shelf !== newShelf)) {
        this.setState({
          shelf: newShelf
        })
        BooksAPI.update(book, newShelf)
        .then(() => {
          this.props.updateBookData()
        })
        .catch(console.log("There was an inner failure."))
      }
    })
    .catch(console.log("There was an outer failure."))
  }

  componentWillMount() {
    let commonBooks = this.props.bookData.filter((book) => (book.id === this.props.bookId))
    if ((commonBooks.length === 1) && (this.state.shelf !== commonBooks[0].shelf)) {
      this.setState({
        shelf: commonBooks[0].shelf
      })
    }
  }

  render() {
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.url})` }}></div>
            <div className="book-shelf-changer">
              <select value={this.state.shelf} onChange={(event) => this.handleChange(event)}>
                <option value="null" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.title}</div>
          <div className="book-authors">{this.props.author}</div>
        </div>
      </li>
    )
  }
}

export default Book
