import React, { Component } from 'react'
import Book from './Book'

class Shelf extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.sectionTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.bookData
              .filter((shelfBook) => (this.props.shelfType === shelfBook.shelf))
              .map((book) => (
                <Book
                  key={book.id}
                  bookId={book.id}
                  title={book.title}
                  author={(book.hasOwnProperty("authors") ? book.authors.join(", ") : "")}
                  url={(book.hasOwnProperty("imageLinks") && book.imageLinks.hasOwnProperty("thumbnail") ?
                        book.imageLinks.smallThumbnail : "")}
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

export default Shelf
