import React, { Component } from 'react';
import TodoListList from "./TodoListList";
import TodoListCreate from "./TodoListCreate";
import { Button, Collapse, Row, Col, Radio, Input, DatePicker } from "antd";


class App extends Component {
    constructor(props){
        super(props)
        this.state = {
          alltodoLists: [],
          isLoading : true,
          todoItems : [],
      }
    }

    getlists = () => {
      return fetch('http://localhost:8080/todo-lists')
      .then(response => response.json())
      .then(data => this.setState({alltodoLists: data, isLoading: false }))
    }
    gettodoItems = () => {
      return fetch('http://localhost:8080/todo-items')
      .then(response => response.json())
      .then(data => {
        this.setState({todoItems: data })
      })
    }
    
    handleFilter = (value,todoListId,i,column) => {
     return value&& fetch(`http://localhost:8080/todo-items/${todoListId}/${column}/${value}`)
      .then(response => response.json())
      .then(data => {
        const listIndex = this.state.alltodoLists.findIndex((list)=>(list.id === todoListId));
        this.state.alltodoLists[listIndex] = data
        this.setState({alltodoLists:  this.state.alltodoLists})

      })
   }
   
    
    componentDidMount() {
      this.getlists()
      this.gettodoItems()
      this.setState({Login:  this.state.Login})
    }


  render() {
    return (
       <Row style={{padding: "30px"}}>
       <Col span={12} style={{padding: "30px"}}>
           <TodoListCreate 
            alltodoLists={this.state.alltodoLists}
            isLoading={this.state.isLoading}
            handleFilter={this.handleFilter}
            getlist={this.getlists}
            todoItems={this.state.todoItems} 
            gettodoItems={this.gettodoItems}/>
         </Col>
          <Col span={12} style={{padding: "30px"}} >0
            <TodoListList 
            alltodoLists={this.state.alltodoLists} 
            isLoading={this.state.isLoading} 
            handleFilter={this.handleFilter} 
            getlist={this.getlists} 
            todoItems={this.state.todoItems} 
            gettodoItems={this.gettodoItems}/>
         </Col>
          </Row>
    );
  }
}

export default App;
