import React, { Component } from 'react';
import axios from 'axios';



export default class EditTodo extends Component {
    constructor(props) {
        super(props);

        this.onChangeTodoName = this.onChangeTodoName.bind(this);
        this.onChangeTodoSummary = this.onChangeTodoSummary.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
        this.onChangeFilename = this.onChangeFilename.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_name: '',
            todo_summary: '',
            todo_priority: '',
            todo_filename: '',
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
                    todo_completed: response.data.todo_completed,
                    todo_filename: response.data.todo_filename
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeTodoName(e) {
        this.setState({
            todo_name: e.target.value
        });
    }

    onChangeTodoSummary(e) {
        this.setState({
            todo_summary: e.target.value
        });
    }

    onChangeTodoPriority(e) {
        this.setState({
            todo_priority: e.target.value
        });
    }

    onChangeTodoCompleted(e) {
        this.setState({
            todo_completed: !this.state.todo_completed
        });
    }

    onChangeFilename(filename) {
        this.setState({
            file: filename.target.files[0],
            todo_filename: filename.target.files[0].name
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            todo_name: this.state.todo_name,
            todo_summary: this.state.todo_summary,
            todo_priority: this.state.todo_priority,
            todo_filename: this.state.todo_filename,
            todo_completed: this.state.todo_completed
        };
        console.log(obj);
        axios.post('http://localhost:4000/todos/update/' + this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        
        let file = this.state.file;
        if (file != null)
        {
            let formdata = new FormData();
            formdata.append('uploadedfile', file);
            axios.post(
                'http://localhost:4000/todos/upload',
                formdata,
                {headers: {'content-type': 'multipart/form-data' } }
            ).then(res => console.log(res.data), err => console.log(err));
        }
        
        this.props.history.push('/');
    }


    render() { 
        let img = "../pictures/" + this.state.todo_filename; 
        console.log(img);     
        return (
            <div>
                <h3 align="center">Update Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.todo_name}
                                onChange={this.onChangeTodoName}
                                />
                    </div>
                    <div className="form-group">
                        <label>Summary: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.todo_summary}
                                onChange={this.onChangeTodoSummary}
                                />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityLow" 
                                    value="Low"
                                    checked={this.state.todo_priority==='Low'} 
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityMedium" 
                                    value="Medium" 
                                    checked={this.state.todo_priority==='Medium'} 
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityHigh" 
                                    value="High" 
                                    checked={this.state.todo_priority==='High'} 
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">High</label>
                        </div>
                    </div>
                    <div className="form-check">
                        <input  className="form-check-input"
                                id="completedCheckbox"
                                type="checkbox"
                                name="completedCheckbox"
                                onChange={this.onChangeTodoCompleted}
                                checked={this.state.todo_completed}
                                value={this.state.todo_completed}
                                />
                        <label className="form-check-label" htmlFor="completedCheckbox">
                            Completed
                        </label>                        
                    </div>

                     <div className="form-group"> 
                        <input  type="file"
                                className="form-control"
                                onChange={this.onChangeFilename}
                                name="uploadedfile"
                                accept=".jpg, .jpeg, .png"
                                />
                    </div>

                    <div>
	                    <h3> Picture </h3>
                        <span>{this.state.todo_filename}</span> <br />
                    </div>

                    <br />

                    <div className="form-group">
                        <input type="submit" value="Update Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}