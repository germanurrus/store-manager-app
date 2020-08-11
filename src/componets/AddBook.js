import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { GET_AUTHORS_QUERIES, ADD_BOOK_MUTATION, GET_BOOK_QUERY } from '../queries/queries';
import { flowRight as compose } from 'lodash';

class AddBook extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            genre:'',
            authorId:''
        }
    }
    displayAuthors(){
        let { loading, authors } = this.props.getAuthorsQueries;
        if(loading){
            return (
                <option disabled>Loading options...</option>
            );
        } else {
            return authors.map(author => {
                return (<option key={author.id} value={author.id}> { author.name }</option>)
            });
        }
    }
    submitForm(e){
        e.preventDefault();
        console.log(this.state);
        const {name, genre, authorId } = this.state;
        this.props.addBookMutation({
            variables : {
                name, genre, authorId 
            }, refetchQueries: [{ query: GET_BOOK_QUERY }]
        })
    }
    render(){
        return(
            <form id="add-book" onSubmit={ (e) => this.submitForm(e)}>
                <div className="field">
                    <label>Book Name:</label>
                    <input type="text" onChange={ (e)=> this.setState({ name: e.target.value })}/>
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text" onChange={ (e)=> this.setState({ genre: e.target.value })}/>
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select onChange={ (e)=> this.setState({ authorId: e.target.value })}>
                        <option>Select Author</option>
                        {this.displayAuthors()}
                    </select>
                </div>
                <button>+</button>
            </form>
        );
    }
};

export default compose(
    graphql(GET_AUTHORS_QUERIES, { name: 'getAuthorsQueries'}),
    graphql(ADD_BOOK_MUTATION, { name: 'addBookMutation'})
)(AddBook);