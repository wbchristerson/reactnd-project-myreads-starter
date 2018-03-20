import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'

class Book extends Component {
  state = {
    value: 'none'
  }

  // componentDidMount() {
  //   let filteredData = this.props.shelfData.filter((book) => (book.id === this.props.bookId))
  //   if (filteredData.length() > 0) {
  //     this.setState({
  //       value: filteredData[0].shelf
  //     })
  //   }
  // }

  // handleChange(event) {
  //   let newShelf = event.target.value
  //   let oldShelf = this.state.value
  //   this.setState({value: newShelf})
  //   console.log("Book ID: ", this.props.bookId)
  //   BooksAPI.get(this.props.bookId)
  //   .then((book) => {
  //     let bookObj = {
  //       id: book.id,
  //       title: book.title,
  //       authors: (book.hasOwnProperty("authors") ? book.authors.join(", ") : ""),
  //       url: (book.hasOwnProperty("imageLinks") && book.imageLinks.hasOwnProperty("thumbnail") ?
  //             book.imageLinks.thumbnail : "")
  //     }
  //     this.props.moveToNewShelf(bookObj, oldShelf, newShelf)
  //     console.log("Huh?")
  //     BooksAPI.update(book, newShelf)
  //     .then(() => console.log(book))
  //   })
  //   .catch(() => console.log("Something failed."))
  // }
  handleChange(event) {
    let newShelf = event.target.value
    this.setState({ value: newShelf })
    BooksAPI.get(this.props.bookId)
    .then((book) => {
      if (book.shelf !== newShelf) {
        console.log("Hello, book: ", book)
        console.log("New shelf: ", newShelf)
        BooksAPI.update(book, newShelf)
        .then(() => {
          console.log("Test: ", book)
          this.props.updateRecord()
        })
        .catch(console.log("Failure 2"))
      }
    })
  }

  render() {
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.url})` }}></div>
            <div className="book-shelf-changer">
              <select value={this.state.value} onChange={(event) => this.handleChange(event)}>
                <option value="none" disabled>Move to...</option>
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
