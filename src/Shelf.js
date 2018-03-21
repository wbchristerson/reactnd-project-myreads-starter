import React from 'react'
import Book from './Book'

function Shelf(props) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.sectionTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.bookObjData
            .filter((shelfBook) => (props.shelfType === shelfBook.shelf))
            .map((book) => (
              <Book
                key={book.id}
                bookId={book.id}
                title={book.title}
                shelf={props.shelfType}
                author={(book.hasOwnProperty("authors") ? book.authors.join(", ") : "")}
                url={book.url}
                updateAppState={props.updateAppState}
                bookObjData={props.bookObjData}
                appRef={props.appRef}
              />
            )
          )}
        </ol>
      </div>
    </div>
  )
}

export default Shelf
