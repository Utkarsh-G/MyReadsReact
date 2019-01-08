import React from 'react'
import PropTypes from 'prop-types'

class Book extends React.Component
{

    state = {
        ID:""
    }

    // static getDerivedStateFromProps(props, state){
    //     if (props.shelf !== state.shelf){
    //         return {
    //             shelf: props.shelf
    //         }
    //     }
    // }

    componentDidMount(){
        this.setState({ID:this.props.ID})
    }

    selectionHandler= (event)=>{
        this.props.moveShelves(event.target.value, this.props.ID)
    }

    render(){

        return(
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: "url("+ this.props.thumbnail +")" }}></div>
                <div className="book-shelf-changer">
                    <select value={this.props.shelf} onChange={this.selectionHandler}>
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
    shelf: PropTypes.string.isRequired,
    ID: PropTypes.string.isRequired,
    moveShelves: PropTypes.func.isRequired
}

export default Book
