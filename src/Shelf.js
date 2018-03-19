import React, { Component } from 'react'
import Book from './Book'

class Shelf extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.sectionTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.bookRow.map(book => (
                <Book key={book.title} title={book.title} author={book.author} url={book.url}/>
              )
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default Shelf
