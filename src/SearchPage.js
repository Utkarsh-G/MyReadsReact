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
                console.log(res)
                this.setState({results:res})
            })
        else
            this.setState({results:[{imageLinks:""}]})
    }

    render(){
        const {query, results} = this.state

        return(
            <div className="search-books">
            <div className="search-books-bar">
              {/* <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button> */}
              <Link to='/' className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" value={query} onChange={this.inputHandler}/>

              </div>
            </div>
            <div className="search-books-results">
                <p>{query}</p>
                { (results.length > 1) &&
                    <ol className="books-grid">
                        {results.map(book => 
                        <li key={book.id}>
                        {((book.authors) && <Book
                                title={book.title}
                                authors={book.authors}
                                thumbnail={book.imageLinks.thumbnail}
                                shelf={book.shelf}
                                moveShelves = {()=>{}}
                                ID={book.id}
                            />)}
                        </li>)}
                    </ol>
                }
                
              
            </div>
          </div>
        );
    }

}

// Book.propTypes = {
//     title: PropTypes.string.isRequired,
//     authors: PropTypes.array.isRequired,
//     thumbnail: PropTypes.string.isRequired,
//     shelf: PropTypes.string.isRequired,
//     ID: PropTypes.string.isRequired,
//     moveShelves: PropTypes.func.isRequired
// }

export default SearchPage