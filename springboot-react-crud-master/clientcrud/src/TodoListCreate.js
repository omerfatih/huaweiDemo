import React, {Component} from 'react';
import { Button, Collapse, Row, Col, Radio, Input, DatePicker,Select } from "antd";
const Option = Select.Option;


class TodoListCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {value: '', selectedTodoListId: undefined, selectedTodoItemId: undefined };
        this.handleChange = this.handleChange.bind(this);
        this.handleCreateTodoItem = this.handleCreateTodoItem.bind(this);
        this.handlecreateTodoList = this.handlecreateTodoList.bind(this);
        this.handleChangeList = this.handleChangeList.bind(this);
        this.handleChangeItem = this.handleChangeItem.bind(this);
        this.setdate = this.setdate.bind(this);


    }
    setdate(date, dateString)
    {
        console.log(date, dateString);
        this.setState(
            {setdate: date}
        );

    }

    handleChange(event) {
        this.setState(
            {[event.target.name]: event.target.value}
        );
    }

    handleCreateTodoItem(event) {
        event.preventDefault();
        console.log("handleSubmit Itemdescription: " + this.state.Itemdescription  + "selectedTodoListId :"+this.state.selectedTodoListId+ "selectedTodoItemId :"+this.state.selectedTodoItemId+"date :"+this.state.setdate)
        var todoItem = {description: this.state.Itemdescription ,date:this.state.date ,status:"active",name : this.state.ItemName };
        this.createTodoItem(todoItem).then(()=>this.props.gettodoItems()).then(()=>{this.props.getlist()} );
        
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
    handleChangeList(value) {
        this.setState(
            {selectedTodoListId: value}
        );
        
    }
    handleChangeItem(value) {
        this.setState(
            {selectedTodoItemId: value}
        );
        
    }
    handlecreateTodoList(event)
    {
        event.preventDefault();
        console.log("handleSubmit Listuser: " + this.state.Listuser + " Listuser " + this.state.Listname )
        
        var todoList = {userId: this.state.Listuser, name: this.state.Listname  };
        this.createTodoList(todoList).then(()=>this.props.gettodoItems()).then(()=>{this.props.getlist()} );

    }
    
    createTodoList(todoList) {
        return todoList&&fetch(`http://localhost:8080/add-todo-list`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todoList)
        })
    }
    


    render() {
        const { alltodoLists, isLoading } = this.props;
       
        if(isLoading) {
            return <p>Loading...</p>;
        }
        const seletedTodoList = alltodoLists.find((todoList)=> todoList.id === this.state.selectedTodoListId) || {}
        
        return (
            
            <Row>
            <Col span={12} offset={6}>
          
            TODO LIST CREATE
                <form>
                    <div>
                        <Input  type="text" placeholder="Listuser" name="Listuser"
                               onChange={this.handleChange}/>
                    </div>
                    <div>
                        <Input  type="text" placeholder="Listname" name="Listname"
                               onChange={this.handleChange}/>
                    </div>
                    <div>
                        <Button onClick={this.handlecreateTodoList}>Save</Button>
                    </div>
                    
                </form>
             TODO ITEM CREATE
                 <form>
                     <div>
                         <Input  type="text" placeholder="Itemdescription" name="Itemdescription"
                                onChange={this.handleChange}/>
                     </div>
                     <div>
                         <Input  type="text" placeholder="ItemName" name="ItemName"
                                onChange={this.handleChange}/>
                     </div>
                    <Select style={{ width: 120 }} onChange={this.handleChangeList}>
                    {alltodoLists.map((item, i) => (
                          <Option key={i} value={item.id} >{item.name}</Option>
                        ))}
                    </Select>
                    {this.state.selectedTodoListId &&
                    <Select style={{ width: 120 }} onChange={this.handleChangeItem}>
                    {seletedTodoList.todoItems && seletedTodoList.todoItems.map((item, i) => (
                          <Option value= {item.id} >{item.name}</Option>
                        ))}
                    </Select>
                    }
                    <div><DatePicker onChange={this.setdate}/></div>
                    <div>
                         <Button onClick={this.handleCreateTodoItem}>Save</Button>
                     </div>
                     
                     
                 </form>


             </Col>
          </Row>
        );
    }
}

export default TodoListCreate;
