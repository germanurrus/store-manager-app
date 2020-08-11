import React, { Component } from 'react';
import { GET_BOOK_QUERIES } from '../queries/queries';
import { graphql } from '@apollo/client/react/hoc';
import BookDetails from './BookDetails';


class BookList extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedId : null,
        }
    }
    displayBooks(){
    let { data } = this.props;
    if(data.loading){
        return (<div>Loading...</div>);
    } else {
        return data.books.map(book => {
            return (<li key={book.id} onClick={ (e)=> this.setState({ selectedId: book.id })}>{book.name }</li>);
        })
    }
    }
    render(){
        console.log(this.props);
        return(
            <div>
                <ul id="book-list">
                    {this.displayBooks()}
                </ul>
                < BookDetails bookId={ this.state.selectedId}/>
            </div>
        );
    }
};

export default graphql(GET_BOOK_QUERIES)(BookList);