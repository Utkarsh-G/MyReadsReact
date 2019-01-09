import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf'
import SearchPage from './SearchPage'
import {Link, Route} from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books : [{title:"", authors:[], imageLinks:{thumbnail:""}, shelf:""}],
    booksOnCR: [],
    booksOnWTR: [],
    booksOnR: []
  }

  componentDidMount()
  {
    BooksAPI.getAll()
    .then(
      books => {
        const CRbooks = books.filter(book => book.shelf === "currentlyReading")
        const WTRbooks = books.filter(book => book.shelf === "wantToRead")
        const Rbooks = books.filter(book => book.shelf === "read")
        console.log(CRbooks)
        console.log(WTRbooks)
        console.log(Rbooks)
        this.setState(_ => ({
          books:books,
          booksOnCR: CRbooks,
          booksOnWTR: WTRbooks,
          booksOnR: Rbooks
        }))
      }
    )
  }

  moveToOtherShelf = (newShelf, bookID) =>
  {
        const book = this.state.books.find(book => book.id === bookID);

        this.setState(prevState => {
        let booksOnCR_ = prevState.booksOnCR.filter(book => book.id !== bookID)
        let booksOnWTR_ = prevState.booksOnWTR.filter(book => book.id !== bookID)
        let booksOnR_ = prevState.booksOnR.filter(book => book.id !== bookID)

        if (newShelf === "currentlyReading") booksOnCR_.push(book)
        if (newShelf === "wantToRead") booksOnWTR_.push(book)
        if (newShelf === "read") booksOnR_.push(book)

        BooksAPI.update(book,newShelf).then()

        return ({booksOnCR: booksOnCR_, booksOnWTR: booksOnWTR_, booksOnR: booksOnR_})

      })

      


  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={()=>(
          <SearchPage />
          )} />
          
        <Route exact path='/' render={()=>(<div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf title={"Currently Reading"}
                        books={this.state.booksOnCR}
                        moveShelves={this.moveToOtherShelf}
                        shelfID={"currentlyReading"}
                />
                <Shelf title={"Want To Read"}
                  books={this.state.booksOnWTR}
                  moveShelves={this.moveToOtherShelf}
                  shelfID={"wantToRead"}
                />
                  <Shelf title={"Read"}
                    books={this.state.booksOnR}
                    moveShelves={this.moveToOtherShelf}
                    shelfID={"read"}
                />
                              </div>
            </div>
            <div className="open-search">
              {/* <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button> */}
              
              <Link to='/search'><button>A button</button></Link>
            </div>
          </div>)} />
          
        
      </div>
    )
  }
}

export default BooksApp
