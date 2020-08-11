import React, { Component } from 'react';
import { GET_BOOK_QUERY } from '../queries/queries';
import { graphql } from '@apollo/client/react/hoc';

class BookDetails extends Component {
    displayBookDetails(){
        const { book } = this.props.data;
        if(book){
            return (<div id="book-details">
            <h2> { book.name} </h2>
            <p> { book.genre} </p>
            <p> { book.author.name} </p>
            <p> All books by this author</p>
            <ul className="other-books">  
                { book.author.books
                    .map(item => { return <li key={item.id}>{item.name}</li> })}
            </ul>
           </div>)
        }else{
            return(
                <div id="book-details">
                 <p> No book selected </p>
                </div>
            );
        }
    }
    render(){
        return(
            <div id="book-details">
             {this.displayBookDetails()}
            </div>
        ); 
       
    }
};

export default graphql(GET_BOOK_QUERY,{
    options: (props) => {
        return {
            variables: { id: props.bookId}
        }
    }
})(BookDetails);