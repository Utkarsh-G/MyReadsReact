import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {search} from './BooksAPI'
import Book from './Book'

class SearchPage extends React.Component
{

    state = {
        query:"",
        results:[{imageLinks:""}]
    }

    inputHandler= (event)=>{


        this.setState({query: event.target.value})

        if(event.target.value !== "")
            search(event.target.value).then((res)=>{
                this.setState({results:res})
            })
        else
            this.setState({results:[{imageLinks:""}]})
    }

    render(){
        const {query, results} = this.state
        const {shelfBooks} = this.props
        
        let booksUpdated = []
        if(results.length > 0 && results[0].imageLinks !== "")
        {
            for(let bookR of results)
            {
    
                const shelfCopy = shelfBooks.find(bookS => bookS.id === bookR.id)
    
                if(shelfCopy)
                    booksUpdated.push(shelfCopy)
                else
                    booksUpdated.push({...bookR,shelf:"none"})
            }
        }

        return(
            <div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" value={query} onChange={this.inputHandler}/>
              </div>
            </div>
            <div className="search-books-results">
                { (booksUpdated.length > 0) &&
                    <ol className="books-grid">
                        {booksUpdated.map(book => 
                        <li key={book.id}>
                        {((book.authors) && (book.imageLinks) && <Book
                                title={book.title}
                                authors={book.authors}
                                thumbnail={book.imageLinks.thumbnail}
                                shelf={book.shelf}
                                moveShelves = {this.props.moveShelves}
                                ID={book.id}
                                book={book}
                            />)}
                        </li>)}
                    </ol>
                }
                
              
            </div>
          </div>
        );
    }

}

SearchPage.propTypes = {
    shelfBooks: PropTypes.array.isRequired,
    moveShelves: PropTypes.func.isRequired
}

export default SearchPage