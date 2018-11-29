import React, {Component} from 'react';
import './App.css';

class TodoListCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        console.log("NAME: " + event.target.name + " VALUE: " + event.target.value)
        this.setState(
            {[event.target.name]: event.target.value}
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        var todolist = {owner: this.state.owner, name: this.state.name };
        this.createTodoList(todolist).then(()=>{this.props.dsadsadsadsad()});
        
    }


    createTodoList(TodoList) {
        return fetch('http://localhost:8080/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(TodoList)
        })
    }


    render() {
        return (
            <div className="App-header">
                <form>
                <div>
                        <input type="text" placeholder="owner" name="owner"
                               onChange={this.handleChange}/>
                    </div>
                    <div>
                        <input type="text" placeholder="name" name="name"
                               onChange={this.handleChange}/>
                    </div>
                    <div>
                        <button onClick={this.handleSubmit}>Save</button>
                    </div>
                    
                </form>
            </div>
        );
    }
}

export default TodoListCreate;
