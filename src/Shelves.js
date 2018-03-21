import React from 'react'
import Shelf from './Shelf'
import { Link } from 'react-router-dom'

function Shelves(props) {
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
            bookData={props.bookData}
            updateBookData={props.updateBookData}
          />
          <Shelf
            sectionTitle="Want to Read"
            shelfType="wantToRead"
            bookData={props.bookData}
            updateBookData={props.updateBookData}
          />
          <Shelf
            sectionTitle="Read"
            shelfType="read"
            bookData={props.bookData}
            updateBookData={props.updateBookData}
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

export default Shelves
