package com.crudoption;

import com.crudoption.model.TodoItem;
import com.crudoption.model.TodoList;
import com.crudoption.model.User;
import com.crudoption.service.TodoListRepository;
import com.crudoption.service.UserRepository;
import com.crudoption.service.TodoItemRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.Console;
import java.sql.Date;
import java.util.stream.Stream;
import java.util.List;
import java.util.ArrayList;


@SpringBootApplication
public class ServercrudApplication implements CommandLineRunner{

    @Autowired
    TodoListRepository todolistrepository;

    @Autowired
    TodoItemRepository todoitemrepository;

    @Autowired
    UserRepository userrepository;

    public static void main(String[] args) {
        SpringApplication.run(ServercrudApplication.class, args);
    }

    @Override
    public void run(String... strings) throws Exception {
        TodoItem a1 =  this.todoitemrepository.save(new TodoItem("bTodoItem","1","passive", new Date(118,1,2), null));
        TodoItem a2 = this.todoitemrepository.save(new TodoItem("aTodoItem","2","active", new Date(118,1,1), 1L));
        TodoItem a4 = this.todoitemrepository.save(new TodoItem("dTodoItem","2","active", new Date(118,1,1), 2L));
        TodoItem a3 = this.todoitemrepository.save(new TodoItem("cTodoItem","2","active", new Date(118,1,4), null));

        List<TodoItem> items = new ArrayList<TodoItem>();
        items.add(a1);
        items.add(a2);
        items.add(a4);

        List<TodoItem> items2 = new ArrayList<TodoItem>();
        items2.add(a3);

        this.todolistrepository.save(new TodoList("aTodoList",1L, items));
        this.todolistrepository.save(new TodoList("bTodoList",2L, items2));

        this.userrepository.save(new User("omer","123"));
        this.userrepository.save(new User("fatih","123"));


    }
}
