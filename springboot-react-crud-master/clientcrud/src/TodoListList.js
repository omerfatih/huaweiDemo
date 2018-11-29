import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class TodoListList extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    }

    handleSubmitDelete = (event) => {
        
        console.log("delete handleSubmit")
        event.preventDefault();
        console.log(event.target.parentNode.id);
        this.userDelete(event.target.parentNode.id).then(()=>{this.props.dsadsadsadsad()});
        
    }

    userDelete = (todoListId) => {
      console.log(JSON.stringify(todoListId))
        return fetch('http://localhost:8080/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todoListId)
        })
    }

    handleSubmitChangeStatus =(event) =>{
        
        console.log("handleSubmitChangeStatus")
        event.preventDefault();
        console.log(event.target.parentNode.id);
        this.userChangeStatus(event.target.parentNode.id).then(()=>{this.props.dsadsadsadsad()});
        
    }

    userChangeStatus = (UserId) => {
      console.log(JSON.stringify(UserId))
        return fetch('http://localhost:8080/status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(UserId)
        })
    }
    


// <button onClick={this.handleSubmitChangeStatus} style={{backgroundColor: `${todoList.status === "active" ? 'red': 'green'}`}}>{todoList.status === "active" ? "PASIF" : "ACTIVE"}</button>
  render() {
      const {todoLists, isLoading} = this.props;
      if (isLoading) {
          return <p>Loading...</p>;
      }
      console.log(todoLists)
    return (
      <div className="App">
          <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" /> 
              <h2>Spring Boot and React CRUD Options</h2>
          </div>
          <div>
              <h2>todoList List</h2>
              {todoLists.map((todoList) =>
              <li key={todoList.id} id={todoList.id} className={todoList.status}>
                  
                      <span >{todoList.id}</span>
                      <span >{todoList.name}</span>
                      <span >{todoList.owner}</span>
                      <button onClick={this.handleSubmitDelete}>delete</button>
                  </li>
              )}
          </div>
      </div>
    );
  }
}

export default TodoListList;
