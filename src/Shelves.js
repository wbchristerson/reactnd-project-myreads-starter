import React from 'react'
import Shelf from './Shelf'
import { Link } from 'react-router-dom'

class Shelves extends React.Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf
              sectionTitle="Currently Reading"
              shelfType="currentlyReading"
              bookData={this.props.bookData}
              updateBookData={this.props.updateBookData}
            />
            <Shelf
              sectionTitle="Want to Read"
              shelfType="wantToRead"
              bookData={this.props.bookData}
              updateBookData={this.props.updateBookData}
            />
            <Shelf
              sectionTitle="Read"
              shelfType="read"
              bookData={this.props.bookData}
              updateBookData={this.props.updateBookData}
            />
          </div>
        </div>
        <div className="open-search">
          <Link
            to="/search"
          >Add a book</Link>
        </div>
      </div>
    )
  }
}

export default Shelves
