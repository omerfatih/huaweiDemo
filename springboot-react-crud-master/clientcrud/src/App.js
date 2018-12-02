import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoListList from "./TodoListList";
import TodoListCreate from "./TodoListCreate";


class App extends Component {
    constructor(props){
        super(props)
        this.state = {
          todolists: [],
          isLoading : false,
          todoItems : []
      }
    }

    omerBaslat = () => {
      console.log("omerBaslat")
      return fetch('http://localhost:8080/todo-lists')
      .then(response => response.json())
      .then(data => this.setState({todolists: data, isLoading: false }))
    }
    todoItemsal = () => {
      console.log("todoItemsal")
      return fetch('http://localhost:8080/todo-items')
      .then(response => response.json())
      .then(data => this.setState({todoItems: data }))
    }


    handleFilterByOnSearch = (value,todoList,i) => {

     /* this.omerBaslat().then(() => {
         const aa  = [].concat(todoList.todoItems.find((item) => item.name === value) || []);
         todoList.todoItems = [{...aa}];
           this.state.todolists[i] = todoList;
           this.setState({todolists: this.state.todolists})
           console.log(todoList)
     });*/
     return fetch(`http://localhost:8080/todo-lists/${todoList}`)
      .then(response => response.json())
      .then(data => this.setState({todoItems: data, isLoading: false}))
     
   }
    
    componentDidMount() {
      this.omerBaslat()
      this.todoItemsal()
    }


  render() {
    return (
      <div className="App">
           <TodoListList todoLists={this.state.todolists} isLoading={this.state.isLoading} handleFilterByOnSearch={this.handleFilterByOnSearch} dsadsadsadsad={this.omerBaslat} todoItems={this.state.todoItems} todoitemsal={this.todoItemsal}/>
           <TodoListCreate todoLists={this.state.todolists} isLoading={this.state.isLoading} handleFilterByOnSearch={this.handleFilterByOnSearch} dsadsadsadsad={this.omerBaslat} todoItems={this.state.todoItems} todoitemsal={this.todoItemsal} />
      </div>
    );
  }
}

export default App;
