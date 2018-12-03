package com.crudoption.service;


import java.util.Date;
import java.util.List;

import com.crudoption.model.TodoItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoItemRepository extends JpaRepository<TodoItem, Long>{

    public TodoItem findById(Long id);
    //public TodoItem findByName(String name);
    //public List<TodoItem>  findByName(Date createdDate);
    public List<TodoItem>  findByName(String name);
    public List<TodoItem> findBycreatedDate(Date createdDate); 
    public List<TodoItem>  findBystatus(String status);


    //public User deleteById(String UserId);
    


    //@Query("delete from users where id=?");
    //public User deleteByID(String UserId);

}
