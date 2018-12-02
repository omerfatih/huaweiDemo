import React, { Component } from "react";
import logo from "./logo.svg";
import { Button, Collapse, Row, Col, Radio, Input, DatePicker, List } from "antd";
import "./App.css";

const Panel = Collapse.Panel;
const Search = Input.Search;

class TodoListList extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "", RadioValue: "name", statusRadioValue: "active", OrderRadioValue: "name",  setstatusRadioValue :"active"};
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
      this.props.dsadsadsadsad();
    });
  };

  handleDeleteTodoItem = (e, todoListId, todoItemId) => {
    e.stopPropagation();
    fetch(`http://localhost:8080/todo-items/${todoListId}/${todoItemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(() => {
      this.props.dsadsadsadsad();
    });
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

  handleSubmitChangeStatus = event => {
    console.log("handleSubmitChangeStatus");
    event.preventDefault();
    console.log(event.target.parentNode.id);
    this.userChangeStatus(event.target.parentNode.id).then(() => {
      this.props.dsadsadsadsad();
    });
  };

  userChangeStatus = UserId => {
    console.log(JSON.stringify(UserId));
    return fetch("http://localhost:8080/status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(UserId)
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
    }
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

  setStateofItem = (e) =>{
    console.log("setStateofItem/ val:"+e.target.value);
    this.setState({setstatusRadioValue: e.target.value})
    
  }
  


  // <button onClick={this.handleSubmitChangeStatus} style={{backgroundColor: `${todoList.status === "active" ? 'red': 'green'}`}}>{todoList.status === "active" ? "PASIF" : "ACTIVE"}</button>
  render() {
    const { todoLists, isLoading, todoItems } = this.props;
    if (isLoading) {
      return <p>Loading...</p>;
    }
    console.log("lists"+todoLists);

    const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Spring Boot and React CRUD Options</h2>
        </div>
        <div>
          <h2>todoList List</h2>
          <Row>
            <Col span={12} offset={6}>
              <Collapse>
                {todoLists &&
                  todoLists.map((todoList, i) => (
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
                      style={{float: "left"}}

                        defaultValue="name"
                        buttonStyle="solid"
                        onChange={(e) => this.handleOrderByOnChange(e,todoList)
                          
                        }
                        value={this.state.OrderRadioValue}
                      >
                        <Radio.Button value="name">Order by Name</Radio.Button>
                        <Radio.Button value="order_by_exp_date">Order by Expire Date</Radio.Button>
                        <Radio.Button value="status">Order by Status</Radio.Button>
                      </Radio.Group>
                    </div>
                      <Radio.Group
                        defaultValue="name"
                        buttonStyle="solid"
                        onChange={e =>
                          this.setState({ RadioValue: e.target.value })
                        }
                        //value={this.state.RadioValue}
                      >
                        <Radio.Button value="name">Name</Radio.Button>
                        <Radio.Button value="exp_date">Expire Date</Radio.Button>
                        <Radio.Button value="status">Status</Radio.Button>
                      </Radio.Group>
                      {this.state.RadioValue === "name" && (
                        <Search
                          placeholder="input search text"
                          onSearch={value => this.props.handleFilterByOnSearch(value,todoList, i)}
                          enterButton
                        />
                      )}
                      {this.state.RadioValue === "status" && (
                        <div>
                          <Radio.Group
                            defaultValue="passive"
                            buttonStyle="solid"
                            onChange={e =>
                              
                              this.listbyStatus(e,todoList)
                              
                            }
                            value={this.state.statusRadioValue}
                          >
                            <Radio.Button value="active">active</Radio.Button>
                            <Radio.Button value="passive">passive</Radio.Button>
                          </Radio.Group>
                        </div>
                      )}
                      {this.state.RadioValue === "exp_date" && (
                        <div>
                          <DatePicker
                            onChange={(date, dateString) =>
                              console.log(date, dateString)
                            }
                          />
                        </div>
                      )}
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
                                  <Radio.Group
                                    defaultValue="active"
                                    buttonStyle="solid"
                                    onChange={e =>
                                      this.setStateofItem(e)
                                    }
                                    //value={this.state.setstatusRadioValue}
                                  >
                                    <Radio.Button value="active"disabled>active</Radio.Button>
                                    <Radio.Button value="passive">passive</Radio.Button>
                                  </Radio.Group>
                                </div>
                                
                              )}
                              {item.status === "passive" && (
                                <div>
                                  set state:
                                  <Radio.Group
                                    defaultValue="passive"
                                    buttonStyle="solid"
                                    onChange={e =>
                                      this.setStateofItem(e)
                                    }
                                    //value={this.state.setstatusRadioValue}
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
                            {item.deadline}
                            {item.status}
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
