package com.crudoption.model;


import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.OneToMany;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.FetchType;
import com.crudoption.model.TodoItem;
import java.util.List;

import java.util.ArrayList;

@Entity
public class TodoList {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name="name")
    private String name;

    @Column(name="user")
    private String user;

    //@OneToMany
    @OneToMany(fetch = FetchType.EAGER)
    //@Column(name="todoItems")
    private List<TodoItem> todoItems;
    


    public TodoList() {
    }

    public TodoList(String name, String user, List<TodoItem> todoItems) {
        this.name = name;
        this.user = user;
        this.todoItems = todoItems;
    }
    public TodoList(String name, String user) {
        this.name = name;
        this.user = user;
        List<TodoItem> todoemptyItems = new ArrayList<TodoItem>();
        this.todoItems = todoemptyItems;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getuser() {
        return user;
    }

    public void setuser(String user) {
        this.user = user;
    }
    public List<TodoItem> getTodoItems() {
        return todoItems;
    }

    public void setTodoItems(List<TodoItem> todoItems) {
        this.todoItems = todoItems;
    }

    

}
