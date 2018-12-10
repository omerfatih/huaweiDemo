package com.crudoption.web;

import com.crudoption.model.TodoItem;
import com.crudoption.model.TodoList;
import com.crudoption.model.User;
import com.crudoption.service.TodoItemRepository;
import com.crudoption.service.TodoListRepository;
import com.crudoption.service.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.datetime.DateFormatter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Calendar;;

@RestController
public class TodoController {

    @Autowired
    TodoItemRepository todoItemRepository;
    @Autowired
    TodoListRepository todoListRepository;
    @Autowired
    UserRepository userRepository;

    
    @GetMapping("/todo-lists/{userId}")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5000"})
    public ResponseEntity<List<TodoList>> UserTodoList(@PathVariable("userName") Long userId){
        List<TodoList> todoLists = this.todoListRepository.findByUserId(userId);
        return new ResponseEntity<List<TodoList>>(todoLists, HttpStatus.OK);
    }

    @GetMapping("/todo-lists")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5000"})
    public ResponseEntity<List<TodoList>> TodoList(){
        List<TodoList> todoLists = this.todoListRepository.findAll();
        return new ResponseEntity<List<TodoList>>(todoLists, HttpStatus.OK);
    }

    @GetMapping("/todo-items")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5000"})
    public ResponseEntity<List<TodoItem>> todoItem(){
        List<TodoItem> TodoItem = this.todoItemRepository.findAll();
        return new ResponseEntity<List<TodoItem>> (TodoItem, HttpStatus.OK);
    }
    
    @GetMapping("/todo-items/{todoListId}/{column}/{value}")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5000"})
    public ResponseEntity<TodoList> todoItem( @PathVariable("todoListId") Long todoListId, @PathVariable("column") String column,@PathVariable("value") String value){
        TodoList todoList = this.todoListRepository.findById(todoListId);
        List<TodoItem> items = new ArrayList<TodoItem>();
        if(column.equals("name"))
        {
            List<TodoItem> getitems= todoList.getTodoItems();
            for (TodoItem var : getitems) {
                if(var.getName().equals(value))
                {
                    items.add(var);
                }
            }
        }
        else if(column.equals("exp_date"))
        {
            List<TodoItem> getitems= todoList.getTodoItems();
            String DatePattern = "yyyy-mm-dd";
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat(DatePattern);
            for (TodoItem var : getitems) {
                String datenowString = simpleDateFormat.format((var.getcreatedDate()));
                if(datenowString.equals(value))
                {
                    //items.add(var);
                    items.addAll(todoItemRepository.findAll());
                }
            }
        }
        else if(column.equals("status"))
        {
            List<TodoItem> getitems= todoList.getTodoItems();
            for (TodoItem var : getitems) {
                if(var.getStatus().equals(value))
                {
                    items.add(var);
                    
                }
            }
        }
        else
        {
            return new ResponseEntity<TodoList>( HttpStatus.BAD_REQUEST);
        }
        todoList.setTodoItems(items);
        return new ResponseEntity<TodoList> (todoList, HttpStatus.OK);
    }

    @PostMapping("/add-todo-list")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5000"})
    public ResponseEntity<TodoList> todoListCreate(@RequestBody TodoList todoList) {
        TodoList result = null;
        List<TodoItem> todoItems = new ArrayList<TodoItem>();
        todoList.setTodoItems(todoItems);
        if (todoList.getuserId() != null && todoList.getName() != null) {
            result = todoListRepository.save(todoList);
        } else {
            System.out.println("Todo Lists bostur.");
            return new ResponseEntity<TodoList>( HttpStatus.BAD_REQUEST);   
        }
        return new ResponseEntity<TodoList>(result, HttpStatus.CREATED);

    }

    @PostMapping("/add-todo-items/{todoListId}/{todoItemId}")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5000"})
    public ResponseEntity<TodoItem> todoItemCreateWithItem(@RequestBody TodoItem todoItem, @PathVariable("todoListId") Long todoListId, @PathVariable("todoItemId") Long todoItemId) {
        TodoList list = todoListRepository.findById(todoListId);
        TodoItem item = null;
        if (todoItem.getName() != null && todoItem.getDescription() != null) {
            todoItem.setconnectedItemId(todoItemId);
            item = todoItemRepository.save(todoItem);
            List<TodoItem> items = list.getTodoItems();
            items.add(item);
            todoListRepository.save(list);
        } else {
            System.out.println("Todo Item bostur.");
            return new ResponseEntity<TodoItem>( HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<TodoItem>(item, HttpStatus.CREATED);

    }

    @PostMapping("/add-todo-items/{todoListId}")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5000"})
    public ResponseEntity<TodoItem> todoItemCreate(@RequestBody TodoItem todoItem, @PathVariable("todoListId") Long todoListId) {
        TodoList list = todoListRepository.findById(todoListId);
        TodoItem item = null;
        Long connectedItem = null;
        
        Calendar cal = Calendar.getInstance();
        Date dateNow=cal.getTime();
        todoItem.setcreatedDate(dateNow); 
        if (todoItem.getName() != null && todoItem.getDescription() != null) {

            todoItem.setconnectedItemId(connectedItem);
            item = todoItemRepository.save(todoItem);
            List<TodoItem> items = list.getTodoItems();
            items.add(item);
            todoListRepository.save(list);
        } else {
            System.out.println("Todo Item bostur.");
            return new ResponseEntity<TodoItem>( HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<TodoItem>(item, HttpStatus.CREATED);

    }

    @PostMapping("/todo-items/state/{todoListId}/{todoItemId}")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5000"})
    public ResponseEntity<TodoList> todoItemStateUpdate(@PathVariable("todoItemId") Long todoItemId, @PathVariable("todoListId") Long todoListId, @RequestBody String state) {
        TodoList todoList = todoListRepository.findById(todoListId);
        TodoItem todoItem = todoItemRepository.findById(todoItemId);
        
        Long connectedItemId = todoItem.getconnectedItemId();
        TodoItem connectedItem = todoItemRepository.findById(connectedItemId);

        if(connectedItem != null && connectedItem.getStatus().equals("active")){
            return new ResponseEntity<TodoList>(HttpStatus.BAD_REQUEST);
        }
        todoItem.setStatus(state);
        todoItemRepository.save(todoItem);
        todoListRepository.save(todoList);
        
        return new ResponseEntity<TodoList>(todoList, HttpStatus.CREATED);

       
    }

    @DeleteMapping("/todo-items/{todoListId}/{todoItemId}")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5000"})
    public ResponseEntity<TodoList> todoItemDelete(@PathVariable("todoItemId") Long todoItemId, @PathVariable("todoListId") Long todoListId) {
        TodoList todoList = todoListRepository.findById(todoListId);
        TodoItem todoItem = todoItemRepository.findById(todoItemId);
        
        Long connectedItemId = todoItem.getconnectedItemId();
        TodoItem connectedItem = todoItemRepository.findById(connectedItemId);

        if(connectedItem != null && connectedItem.getStatus().equals("active")){
            return new ResponseEntity<TodoList>(HttpStatus.BAD_REQUEST);
        }
        todoList.getTodoItems().remove(todoList.getTodoItems().indexOf(todoItem));
        todoListRepository.save(todoList);
        todoItemRepository.delete(todoItem);
        return new ResponseEntity<TodoList>(todoList, HttpStatus.CREATED);
    }

    @DeleteMapping("/todo-lists/{todoListid}")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5000"})
    public ResponseEntity<TodoList> todoListDelete(@PathVariable("todoListid") Long todoListid) {
        TodoList todoList = todoListRepository.findById(todoListid);
        List<TodoItem> todoItems = todoList.getTodoItems();
        todoListRepository.delete(todoList);
        todoItemRepository.delete(todoItems);
        return new ResponseEntity<TodoList>(todoList, HttpStatus.CREATED);
    }


}
