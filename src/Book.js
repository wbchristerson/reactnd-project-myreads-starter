import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'

class Book extends Component {
  state = {
    shelf: 'none'
  }

  componentDidMount() {
    this.setState({
      shelf: this.props.shelf
    })
  }

  updateBookDataFromBook(newShelf) {
    this.setState({
      shelf: newShelf
    })
    this.updateBookData(newShelf, {
      id: this.props.bookId,
      shelf: "none",
      title: this.props.title,
      authors: this.props.authors,
      url: this.props.url
    })
  }

  updateBookData(newShelf, newBookObj) {
    let data = this.props.bookObjData
    let matchedBookObjs = data.filter((bookObj) => (bookObj.id === newBookObj.id))
    let repObj = {
      id: newBookObj.id,
      shelf: newShelf,
      title: newBookObj.title,
      authors: newBookObj.authors,
      url: newBookObj.url
    }
    if ((matchedBookObjs.length !== 0) && (newShelf !== "none")) {
      data = data.map((bookObj) => {
        if (newBookObj.id !== bookObj.id) {
          return bookObj
        } else {
          return repObj
        }
      })
    } else if ((matchedBookObjs.length !== 0) && (newShelf === "none")) {
      data = data.filter((bookObj) => (bookObj.id !== newBookObj.id))
    } else {
      data.push(repObj)
    }
    this.props.updateAppState(this.props.appRef, data)
    BooksAPI.get(newBookObj.id)
    .then((foundBook) => {
      BooksAPI.update(foundBook, newShelf)
    })
  }

  render() {
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.url})` }}></div>
            <div className="book-shelf-changer">
              <select value={this.state.shelf} onChange={(event) => (this.updateBookDataFromBook(event.target.value))}>
                <option value="null" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.title}</div>
          <div className="book-authors">{this.props.authors}</div>
        </div>
      </li>
    )
  }
}

export default Book
