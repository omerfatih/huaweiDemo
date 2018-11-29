package com.crudoption.service;


import java.util.List;

import com.crudoption.model.TodoItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoItemRepository extends JpaRepository<TodoItem, Long>{

    public TodoItem findById(Long id);

    //public User deleteById(String userId);
    


    //@Query("delete from users where id=?");
    //public User deleteByID(String userId);

}
