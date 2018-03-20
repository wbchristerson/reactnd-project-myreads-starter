import React, { Component } from 'react'
import Book from './Book'

// bookId is necessary

class Shelf extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.sectionTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.shelfData
              .filter((shelfBook) => (this.props.shelfType === shelfBook.shelf))
              .map((book) => (
                <Book
                  key={book.title}
                  bookId={book.id}
                  title={book.title}
                  author={(book.hasOwnProperty("authors") ? book.authors.join(", ") : "")}
                  url={(book.hasOwnProperty("imageLinks") && book.imageLinks.hasOwnProperty("thumbnail") ?
                        book.imageLinks.smallThumbnail : "")}
                  moveToNewShelf={this.props.moveToNewShelf}
                  updateRecord={this.props.updateRecord}
                  shelfData={this.props.shelfData}
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
