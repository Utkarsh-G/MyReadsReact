# MyReads Project

* install all project dependencies with `npm install`
* start the development server with `npm start`

# Project Description

The main App component can routes between the main page and the search page using Browser Router.

The Main Page is rendered explicitly in a Route in App.js using subcomponents.
The Search Page is its own component SearchPage which is imported in its Route in App.js.

# Usage
All requirements of project are met: Books can be moved between shelves and added from search to shelves, using the "select" input. To remove from all shelves, select "none" option.

Search page shows relevant results when keywords are typed in. User can add books from search to shelves by using "select" input.

In cases of bad input (like when searched book does not have an author or image link), the books are not displayed in search results.

#Hierarchy of Components:

|-- App.js (contains Main Page)
    |-- Shelf.js, one of each Shelf
        |-- Book.js
    |-- SearchPage.js
        |-- Book.js

App's state holds all information on books on the shelves. 
Shelf passes props from App to Book to render all the books.
SearchPage's state holds the search query. It passes props from App to Book to track books already on shelves.
Book accepts props from Shelf or SearchPage to render itself. It holds as state which shelf it is on.

