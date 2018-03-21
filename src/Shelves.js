import React from 'react'
import Shelf from './Shelf'
import { Link } from 'react-router-dom'

function Shelves(props) {
  let shelfCategories = [
    {
      sectionTitle: "Currently Reading",
      shelfType: "currentlyReading"
    },
    {
      sectionTitle: "Want to Read",
      shelfType: "wantToRead"
    },
    {
      sectionTitle: "Read",
      shelfType: "read"
    }
  ]
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelfCategories.map((shelf) => (
            <Shelf
              key={shelf.sectionTitle}
              sectionTitle={shelf.sectionTitle}
              shelfType={shelf.shelfType}
              bookData={props.bookData}
              updateBookData={props.updateBookData}
            />
          ))}
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
