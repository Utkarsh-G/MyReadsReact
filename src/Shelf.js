import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Shelf extends React.Component {
    state = {
        books: [],
        title: ""
    }

    render(){
        return(
                <div className="bookshelf">
                  <h2 className="bookshelf-title">{this.props.title}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.books.map(book => 
                            <li key={book.id}>
                            <Book
                                title={book.title}
                                authors={book.authors}
                                thumbnail={book.imageLinks.thumbnail}
                                shelf={this.props.shelfID}
                                moveShelves = {this.props.moveShelves}
                                ID={book.id}
                            />
                            </li>
                        )}
                    </ol>
                  </div>
                </div>

        )
    }

}

Shelf.propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    moveShelves: PropTypes.func.isRequired,
    shelfID: PropTypes.string.isRequired
}

export default Shelf