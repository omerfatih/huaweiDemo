package com.crudoption.service;


import java.util.List;

import com.crudoption.model.TodoList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoListRepository extends JpaRepository<TodoList, Long>{

    public TodoList findById(Long id);


}
