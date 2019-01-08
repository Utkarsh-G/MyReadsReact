import React from 'react'
import PropTypes from 'prop-types'

class Book extends React.Component
{

    state = {
        shelf:"none"
    }

    // static getDerivedStateFromProps(props, state){
    //     if (props.shelf !== state.shelf){
    //         return {
    //             shelf: props.shelf
    //         }
    //     }
    // }

    componentDidMount(){
        this.setState({shelf:this.props.shelf})
    }

    selectionHandler= (event)=>{
        this.setState ({shelf:event.target.value})
    }

    render(){

        return(
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: "url("+ this.props.thumbnail +")" }}></div>
                <div className="book-shelf-changer">
                    <select value={this.state.shelf} onChange={this.selectionHandler}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
                </div>
                <div className="book-title">{this.props.title}</div>
                <div className="book-authors">{this.props.authors.map((author,index) => <span key={index}>{author}</span>)}</div>
            </div>
        );
    }

}

Book.propTypes = {
    title: PropTypes.string.isRequired,
    authors: PropTypes.array.isRequired,
    thumbnail: PropTypes.string.isRequired,
    shelf: PropTypes.string.isRequired
}

export default Book
