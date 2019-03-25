import React, { Component } from 'react';
import axios from 'axios';

export default class EditTodo extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_name: '',
            todo_summary: '',
            todo_priority: '',
            todo_completed: false
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    todo_name: response.data.todo_name,
                    todo_summary: response.data.todo_summary,
                    todo_priority: response.data.todo_priority,
                    todo_completed: response.data.todo_completed
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    onSubmit(e) {
        e.preventDefault();
        axios.delete('http://localhost:4000/todos/delete/' + this.props.match.params.id)
            .then(res => console.log(res.data));
        
        this.props.history.push('/');
    }


    render() {
        return (
            <div> 
                <div>
                    <h3 align="center">Delete Todo</h3>
                    <p marginLeft="300px">Name: {this.state.todo_name}</p>
                    <p marginLeft="300px">Summary: {this.state.todo_summary}</p>
                    <p marginLeft="300px">Priority: {this.state.todo_priority}</p>
                    <p marginLeft="300px">Completed: {this.state.todo_completed.toString()}</p>
                </div>
                <form onSubmit={this.onSubmit}>
                <div className="form-group" align="center">
                    <input type="submit" value="Todo Deleted!" className="btn btn-primary" />
                </div>
                </form>
           </div>
        )
    }
}