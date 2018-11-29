package com.crudoption;

import com.crudoption.model.TodoItem;
import com.crudoption.model.TodoList;
import com.crudoption.service.TodoListRepository;
import com.crudoption.service.TodoItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.Console;
import java.sql.Date;
import java.util.stream.Stream;

@SpringBootApplication
public class ServercrudApplication implements CommandLineRunner{

    @Autowired
    TodoListRepository todolistrepository;

    @Autowired
    TodoItemRepository todoitemrepository;

    public static void main(String[] args) {
        SpringApplication.run(ServercrudApplication.class, args);
    }

    @Override
    public void run(String... strings) throws Exception {
        
        this.todolistrepository.save(new TodoList("TodoList","1"));
        this.todolistrepository.save(new TodoList("TodoList","2"));
        this.todolistrepository.save(new TodoList("TodoList","3"));
        this.todolistrepository.save(new TodoList("TodoList","4"));
        this.todolistrepository.save(new TodoList("TodoList","5"));
        
        this.todoitemrepository.save(new TodoItem("TodoItem","1","active"));
        this.todoitemrepository.save(new TodoItem("TodoItem","2","active"));
        this.todoitemrepository.save(new TodoItem("TodoItem","2","active"));


    }
}
