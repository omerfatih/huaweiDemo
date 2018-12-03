import React, { Component } from "react";
import logo from "./logo.svg";
import { Button, Collapse, Row, Col, Radio, Input, DatePicker } from "antd";

const Panel = Collapse.Panel;
const Search = Input.Search;

class TodoListList extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "", FindRadioValue: "name", statusRadioValue: "active", OrderRadioValue: "name",  setstatusRadioValue :"active" };
  }

  handleSubmitDelete = (
    e,
    todoListid
  ) => {
    e.stopPropagation();
    console.log(todoListid+"delete handleSubmit");
    e.preventDefault();
    ;
    this.listDelete(todoListid).then((e) => {
      
      console.log(e);
      console.log(e.TodoList);
      this.props.getlist();
    });
  };

  handleDeleteTodoItem = (e, todoListId, todoItemId) => {
    e.stopPropagation();
    fetch(`http://localhost:8080/todo-items/${todoListId}/${todoItemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    this.props.getlist();
    
  };

  listDelete = todoListId => {
    console.log("listDelete todoListId : "+JSON.stringify(todoListId));
    return fetch(`http://localhost:8080/todo-lists/${todoListId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(todoListId)
    });
  };

  

  handleOrderByOnChange = (e,todoList) =>{
    
    this.setState({ OrderRadioValue: e.target.value })
    if (e.target.value === "order_by_exp_date") { todoList = todoList.todoItems.sort(function(a,b) {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
    })} else if(e.target.value === "name") {
        todoList = todoList.todoItems.sort((a, b) => a.name.localeCompare(b.name))
    }else if(e.target.value === "status") {
        todoList = todoList.todoItems.sort((a, b) => a.status.localeCompare(b.status))
    }else if(e.target.value === "createdate") { todoList = todoList.todoItems.sort(function(a,b) {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
    })}
  }
  listbyStatus = (e,todoList) =>{
    console.log("listbyStatus/ val :"+e.target.value);
    this.setState({statusRadioValue: e.target.value})
    if(e.target.value === "active") {
        todoList = todoList.todoItems.sort((a, b) => a.status.localeCompare(b.status))
    }
    if(e.target.value === "passive") {
      todoList = todoList.todoItems.sort((a, b) => b.status.localeCompare(a.status))
    }
  }

  setStateofItem = (e, todoListId, todoItemId) =>{
    console.log("setStateofItem/ val:",e.target.value, todoListId, todoItemId);
    this.setState({setstatusRadioValue: e.target.value})
    fetch(`http://localhost:8080/todo-items/state/${todoListId}/${todoItemId}`, {
      method: "POST",
      body: e.target.value
    }).then(()=>this.props.gettodoItems()).then(()=>{
      this.props.getlist()

    });
  }
  

  
  


  render() {
    const { alltodoLists, isLoading } = this.props;
    
    if (isLoading) {
      return <p>Loading...</p>;
    }
    return (
      <div className="App">
        <div>
          <h2>Todo List</h2>
          <Row>
            <Col span={24}>
              <Collapse>
                {alltodoLists &&
                  alltodoLists.map((todoList, i) => (
                    <Panel
                      key={todoList.id}
                      header={
                        <div>
                          {todoList.name}
                          <Button
                            style={{ float: "right" }}
                            onClick={e => this.handleSubmitDelete(
                              e,todoList.id
                            )}
                          >
                            delete
                          </Button>
                        </div>
                      }
                    >
                    <div style={{margin: "20px"}}>
                    
                     <Radio.Group
                      style={{float: "center"}}

                        defaultValue="name"
                        buttonStyle="solid"
                        onChange={(e) => this.handleOrderByOnChange(e,todoList)
                          
                        }
                        value={this.state.OrderRadioValue}
                      >
                        <Radio.Button value="name">Order by Name</Radio.Button>
                        <Radio.Button value="order_by_exp_date">Order by Expire Date</Radio.Button>
                        <Radio.Button value="status">Order by Status</Radio.Button>
                        <Radio.Button value="createdate">Order by Createdate</Radio.Button>
                      </Radio.Group>
                    </div>
                      <Radio.Group
                        style={{float: "center"}}
                        defaultValue="name"
                        buttonStyle="solid"
                        onChange={e =>
                          this.setState({ FindRadioValue: e.target.value })
                        }
                        //value={this.state.RadioValue}
                      >
                      
                        <Radio.Button value="name">Find by Name</Radio.Button>
                        <Radio.Button value="exp_date">Find by Expire Date</Radio.Button>
                        <Radio.Button value="status">Find by Status</Radio.Button>
                      </Radio.Group>
                      {this.state.FindRadioValue === "name" && (
                        <Search
                          placeholder="input search text"
                          onSearch={value => this.props.handleFilter(value,todoList.id, i,this.state.FindRadioValue)}
                          enterButton
                        />
                      )}
                      {this.state.FindRadioValue === "status" && (
                        <div>
                          <Radio.Group
                           
                            buttonStyle="solid"
                            onChange={e => {
                              this.props.handleFilter(e.target.value,todoList.id, i,this.state.FindRadioValue)
                              this.setState({statusRadioValue: e.target.value})
                            }}
                            value={this.state.statusRadioValue}
                          >
                            <Radio.Button value="active">active</Radio.Button>
                            <Radio.Button value="passive">passive</Radio.Button>
                          </Radio.Group>
                        </div>
                      )}
                      {this.state.FindRadioValue === "exp_date" && (
                        <div>
                          <DatePicker
                            onChange={(date, dateString) =>
                              this.props.handleFilter(dateString,todoList.id, i,this.state.FindRadioValue)
                            }
                          />
                        </div>
                      )}
                      <Button
                        onClick={this.props.getlist}>
                          Reset
                      </Button>
                      <Collapse>
                        {todoList.todoItems.map((item, i) => (
                          <Panel
                            header={
                              <div>
                                {item.name} 
                                <div>{" STATE : "+item.status}</div>
                                <Button
                                  style={{ float: "right" }}
                                  onClick={e =>
                                    this.handleDeleteTodoItem(
                                      e,
                                      todoList.id,
                                      item.id
                                    )
                                  }
                                >
                                  delete
                                </Button>
                                {item.status === "active" && (
                                <div>
                                  set state: 
                                  {console.log(item.id+"active")}
                                  <Radio.Group
                                    defaultValue="active"
                                    buttonStyle="solid"
                                    onChange={e =>
                                      this.setStateofItem(e, todoList.id, item.id)
                                    }
                                  >
                                    <Radio.Button value="active"disabled>active</Radio.Button>
                                    <Radio.Button value="passive">passive</Radio.Button>
                                  </Radio.Group>
                                </div>
                                
                                )}
                                {item.status === "passive" && (
                                  <div>
                                    set state:
                                    {console.log(item.id+"passive")}
                                    <Radio.Group
                                      defaultValue="passive"
                                      buttonStyle="solid"
                                      onChange={e =>
                                        this.setStateofItem(e, todoList.id, item.id)
                                      }
                                    >
                                      <Radio.Button value="active">active</Radio.Button>
                                      <Radio.Button value="passive"disabled>passive</Radio.Button>
                                    </Radio.Group>
                                  </div>
                                )}
                              </div>
                            }
                            key={i}
                          >
                            {item.description}
                            <div>Createdate :{item.createdDate}</div>
                            <div>DeadLine :{item.deadline}</div>
                          </Panel>
                        ))}
                      </Collapse>
                    </Panel>
                  ))}
              </Collapse>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default TodoListList;
