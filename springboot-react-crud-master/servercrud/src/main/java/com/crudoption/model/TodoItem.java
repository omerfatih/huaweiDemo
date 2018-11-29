package com.crudoption.model;


import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.List;

@Entity
public class TodoItem {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name="name")
    private String name;

    @Column(name="description")
    private String description;
    
    @Column(name="status")
    private String status;

    @Column(name="deadline")
    private Date deadline;

    @Column(name="connectedItems")
    private List<TodoItem>  connectedItems;
    


    public TodoItem() {
    }

    public TodoItem(String name, String description, String status) {
        this.name = name;
        this.description = description;
        this.status = status;
        this.deadline = new Date(1900, 11, 11);
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getDeadline() {
        return deadline;
    }

    public void setDeadline(Date deadline) {
        this.deadline = deadline;
    }

    public List<TodoItem> getconnectedItems() {
        return connectedItems;
    }

    public void setconnectedItems(List<TodoItem>  connectedItems) {
        this.connectedItems = connectedItems;
    }
    

    
}
