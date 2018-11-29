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
          isLoading : false
      }
    }

    omerBaslat = () => {
      console.log("omerBaslat")
      fetch('http://localhost:8080/todo-lists')
      .then(response => response.json())
      .then(data => this.setState({todolists: data, isLoading: false}))
    }

    
    componentDidMount() {
      this.omerBaslat()
    }


  render() {
    return (
      <div className="App">
           <TodoListList todolists={this.state.todolists} isLoading={this.state.isLoading}  dsadsadsadsad={this.omerBaslat} />
           <TodoListCreate dsadsadsadsad={this.omerBaslat} />
      </div>
    );
  }
}

export default App;
