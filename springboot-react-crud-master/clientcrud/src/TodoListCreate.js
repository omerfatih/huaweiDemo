import React, {Component} from 'react';
import { Button, Collapse, Row, Col, Radio, Input, DatePicker,Select } from "antd";
import "./App.css";
const Option = Select.Option;


class TodoListCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {value: '', selectedTodoListId: undefined, selectedTodoItemId: undefined };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitlist = this.handleSubmitlist.bind(this);
        this.handleChangeList = this.handleChangeList.bind(this);
        this.handleChangeItem = this.handleChangeItem.bind(this);
        this.dateChange = this.dateChange.bind(this);

    }
    dateChange(date, dateString)
    {
        console.log(date, dateString);
        this.setState(
            {setdate: date}
        );

    }

    handleChange(event) {
        console.log("handleChange NAME: " + event.target.name + " VALUE: " + event.target.value+" selectedTodoListId: "+this.state.selectedTodoListId+" selectedTodoItemId: "+this.state.selectedTodoItemId)
        this.setState(
            {[event.target.name]: event.target.value}
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("handleSubmit Itemdescription: " + this.state.Itemdescription  + "selectedTodoListId :"+this.state.selectedTodoListId+ "selectedTodoItemId :"+this.state.selectedTodoItemId+"date :"+this.state.setdate)
        var todoItem = {description: this.state.Itemdescription ,date:this.state.date ,status:"active",name : this.state.ItemName };
        this.createTodoItem(todoItem).then(()=>this.props.todoitemsal()).then(()=>{this.props.dsadsadsadsad()} );
        
    }


    createTodoItem(TodoItem) {
        if(this.state.selectedTodoItemId == undefined)
        return fetch(`http://localhost:8080/add-todo-items/${this.state.selectedTodoListId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(TodoItem)
        })
        return fetch(`http://localhost:8080/add-todo-items/${this.state.selectedTodoListId}/${this.state.selectedTodoItemId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(TodoItem)
        })
    }
    handleChangeList(value1) {
        console.log(typeof value1);
        this.setState(
            {selectedTodoListId: value1}
        );
        
    }
    handleChangeItem(value1) {
        console.log(typeof value1);
        this.setState(
            {selectedTodoItemId: value1}
        );
        
    }
    handleSubmitlist(event)
    {
        event.preventDefault();
        console.log("handleSubmit Listowner: " + this.state.Listowner + " Listowner " + this.state.Listname )
        
        var todoList = {owner: this.state.Listowner, name: this.state.Listname  };
        this.createTodoList(todoList).then(()=>this.props.todoitemsal()).then(()=>{this.props.dsadsadsadsad()} );

    }
    createTodoList(todoList) {
        return fetch(`http://localhost:8080/add-todo-list`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todoList)
        })
    }


    render() {
        const { todoLists, isLoading, todoItems } = this.props;
        const seletedTodoList = todoLists.find((todoList)=> todoList.id === this.state.selectedTodoListId) || {}
        //console.log(seletedTodoList)
        //console.log(todoLists)
        //console.log(this.state.selectedTodoListId)
        
        return (
            
            <div>
            <div className="App-header">
            {todoLists.map((item, i) => (
                          <div>  {item.name}  </div>
                        ))}
            TODO LIST CREATE
                <form>
                    <div>
                        <input type="text" placeholder="Listowner" name="Listowner"
                               onChange={this.handleChange}/>
                    </div>
                    <div>
                        <input type="text" placeholder="Listname" name="Listname"
                               onChange={this.handleChange}/>
                    </div>
                    <div>
                        <button onClick={this.handleSubmitlist}>Save</button>
                    </div>
                    
                </form>
            </div>
             <div className="App-header">
             {todoItems.map((item, i) => (
                          <div>  {item.name}  </div>
                        ))}
             TODO ITEM CREATE
                 <form>
                     <div>
                         <input type="text" placeholder="Itemdescription" name="Itemdescription"
                                onChange={this.handleChange}/>
                     </div>
                     <div>
                         <input type="text" placeholder="ItemName" name="ItemName"
                                onChange={this.handleChange}/>
                     </div>
                    <Select style={{ width: 120 }} onChange={this.handleChangeList}>
                    {todoLists.map((item, i) => (
                          <Option value={item.id} >{item.name}</Option>
                        ))}
                    </Select>
                    {this.state.selectedTodoListId &&
                    <Select style={{ width: 120 }} onChange={this.handleChangeItem}>
                    {seletedTodoList.todoItems && seletedTodoList.todoItems.map((item, i) => (
                          <Option value= {item.id} >{item.name}</Option>
                        ))}
                    </Select>
                    }
                    <div><DatePicker onChange={this.dateChange}/></div>
                    <div>
                         <button onClick={this.handleSubmit}>Save</button>
                     </div>
                     
                     
                 </form>


             </div>
             </div>
        );
    }
}

export default TodoListCreate;
