import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

const Shelf = (props) => (

                <div className="bookshelf">
                  <h2 className="bookshelf-title">{props.title}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                        {props.books.map(book => 
                            <li key={book.id}>
                            <Book
                                title={book.title}
                                authors={book.authors}
                                thumbnail={book.imageLinks.thumbnail}
                                shelf={props.shelfID}
                                moveShelves = {props.moveShelves}
                                ID={book.id}
                                book={book}
                            />
                            </li>
                        )}
                    </ol>
                  </div>
                </div>

)

Shelf.propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    moveShelves: PropTypes.func.isRequired,
    shelfID: PropTypes.string.isRequired
}

export default Shelf