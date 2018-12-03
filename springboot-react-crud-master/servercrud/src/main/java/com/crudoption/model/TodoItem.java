package com.crudoption.model;


import java.util.Date;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import javax.persistence.Column;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.List;
import java.util.Calendar;

import org.hibernate.type.DateType;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;

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

    @CreatedDate
    private Date createdDate;

    private Long  connectedItemId;
    


    public TodoItem() {       
        Calendar cal = Calendar.getInstance();
        Date dateNow=cal.getTime();
        createdDate = dateNow;
    }
    public TodoItem(String name, String description, String status, Date date) {
        this.name = name;
        this.description = description;
        this.status = status;
        this.deadline = date;
        Calendar cal = Calendar.getInstance();
        Date dateNow=cal.getTime();
        this.createdDate = dateNow;

    }

    public TodoItem(String name, String description, String status, Date date, Long connectedItemId) {
        this.name = name;
        this.description = description;
        this.status = status;
        this.deadline = date;
        this.connectedItemId = connectedItemId;
        Calendar cal = Calendar.getInstance();
        Date dateNow=cal.getTime();
        this.createdDate = dateNow;
        
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

    public Date getcreatedDate() {
        return createdDate;
    }

    public void setcreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }
    public Date getDeadline() {
        return deadline;
    }

    public void setDeadline(Date deadline) {
        this.deadline = deadline;
    }

    public Long getconnectedItemId() {
        return connectedItemId;
    }

    public void setconnectedItemId(Long connectedItemId) {
        this.connectedItemId = connectedItemId;
    }
   
}
