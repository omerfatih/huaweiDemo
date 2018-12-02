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

    @Column(name="owner")
    private String owner;

    //@OneToMany
    @OneToMany(fetch = FetchType.EAGER)
    //@Column(name="todoItems")
    private List<TodoItem> todoItems;
    


    public TodoList() {
    }

    public TodoList(String name, String owner, List<TodoItem> todoItems) {
        this.name = name;
        this.owner = owner;
        this.todoItems = todoItems;
    }
    public TodoList(String name, String owner) {
        this.name = name;
        this.owner = owner;
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

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }
    public List<TodoItem> getTodoItems() {
        return todoItems;
    }

    public void setTodoItems(List<TodoItem> todoItems) {
        this.todoItems = todoItems;
    }

    

}
