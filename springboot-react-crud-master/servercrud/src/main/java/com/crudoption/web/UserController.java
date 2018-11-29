package com.crudoption.web;

import com.crudoption.model.TodoItem;
import com.crudoption.model.TodoList;
import com.crudoption.service.TodoItemRepository;
import com.crudoption.service.TodoListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import javax.websocket.server.PathParam;


@RestController
public class UserController {

    @Autowired
    TodoItemRepository todoItemRepository;
    @Autowired
    TodoListRepository todoListRepository;


    @GetMapping("/todo-lists")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5000"})
    public ResponseEntity<List<TodoList>> todoList(){

        List<TodoList> todoLists = this.todoListRepository.findAll();
        return new ResponseEntity<List<TodoList>>(todoLists, HttpStatus.OK);
    }

    @GetMapping("/todo-items")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5000"})
    public ResponseEntity<List<TodoItem>> todoitem(@RequestBody TodoList todoList){

        List<TodoItem> todoItems = todoList.getTodoItems();
        return new ResponseEntity<List<TodoItem>>(todoItems, HttpStatus.OK);
    }




    @PostMapping("/add-todo-list")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5000"})
    public ResponseEntity<TodoList> todoListCreate(@RequestBody TodoList todoList) {
        TodoList result = null;
        if (todoList.getOwner() != null && todoList.getName() != null) {
            result = todoListRepository.save(todoList);
        } else {
            System.out.println("Todo Listsis bostur.");
        }
        return new ResponseEntity<TodoList>(result, HttpStatus.CREATED);

    }

    @PostMapping("/delete-todo-list")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5000"})
    public ResponseEntity<TodoList> userDelete(@RequestBody Long todoListId) {
        //User result = new User();
        //System.out.println("User id bostur.");
        TodoList todoList = todoListRepository.findById(todoListId);
        TodoList result = todoList;
        if ( todoList.getName() == null) {
            System.out.println("todoList id bostur.");
        } else {
            todoListRepository.delete(todoList);
        }
        return new ResponseEntity<TodoList>(result, HttpStatus.CREATED);
    }

    @PostMapping("/set-state-todo-items/{todoListId}/{todoItemId}")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5000"})
    public ResponseEntity<TodoList> todoItemStateUpdate(@PathVariable("todoItemId") Long todoItemId, @PathVariable("todoListId") Long todoListId, @RequestBody String state) {
        //User result = new User();
        if ( todoItemId == null) {
            System.out.println("User id bostur.");
            return new ResponseEntity<TodoList>( HttpStatus.NOT_FOUND);
        } 
        else {
            TodoList list = todoListRepository.findById(todoListId);
            TodoItem item = null;
            for(int i= 0 ; i< list.getTodoItems().size();i++)
            {
                item = list.getTodoItems().get(i);
                if(item.getId() == todoItemId);
                {
                    if(state == "passive")
                    {
                        boolean notconnected = true;
                        List<TodoItem> connectedItems = item.getconnectedItems();
                        for(int j=0;j<connectedItems.size();j++)
                        {
                            TodoItem connecteditem = connectedItems.get(j);
                            if(connecteditem.getStatus() == "active")
                            {
                                System.out.print("bu oge non active olamaz connected active itemi var");
                                notconnected = false;
                                return new ResponseEntity<TodoList>( HttpStatus.NOT_FOUND);
                            }

                        }
                        if(notconnected)
                        {
                            item.setStatus("passive");
                            return new ResponseEntity<TodoList>( HttpStatus.CREATED);
                        }
                    }
                    else{
                        item.setStatus("active");
                        return new ResponseEntity<TodoList>( HttpStatus.CREATED);
                    }
                    break;
                }

            }
            if(item == null)
            {
                return new ResponseEntity<TodoList>( HttpStatus.NOT_FOUND);
            }

        }
        return new ResponseEntity<TodoList>( HttpStatus.NOT_FOUND);
    }
    @PostMapping("/set-state-todo-items/{todoListId}/{todoItemId}")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5000"})
    public ResponseEntity<TodoList> todoItemStateDelete(@PathVariable("todoItemId") Long todoItemId, @PathVariable("todoListId") Long todoListId) {
        //User result = new User();
        if ( todoItemId == null) {
            System.out.println("User id bostur.");
            return new ResponseEntity<TodoList>( HttpStatus.NOT_FOUND);
        } 
        else {
            TodoList list = todoListRepository.findById(todoListId);
            TodoItem item = null;
            for(int i= 0 ; i< list.getTodoItems().size();i++)
            {
                item = list.getTodoItems().get(i);
                if(item.getId() == todoItemId);
                {
                
                    boolean notconnected = true;
                    List<TodoItem> connectedItems = item.getconnectedItems();
                    for(int j=0;j<connectedItems.size();j++)
                    {
                        TodoItem connecteditem = connectedItems.get(j);
                        if(connecteditem.getStatus() == "active")
                        {
                            System.out.print("bu oge non active olamaz connected active itemi var");
                            notconnected = false;
                            return new ResponseEntity<TodoList>( HttpStatus.NOT_FOUND);
                        }

                    }
                    if(notconnected)
                    {
                        todoItemRepository.delete(item);
                        return new ResponseEntity<TodoList>( HttpStatus.CREATED);
                    }
                
                    break;
                }

            }
            if(item == null)
            {
                return new ResponseEntity<TodoList>( HttpStatus.NOT_FOUND);
            }

        }
        return new ResponseEntity<TodoList>( HttpStatus.NOT_FOUND);
    }



/*
    @PostMapping("/add-todo-item")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5000"})
    public ResponseEntity<TodoList> TodoListCreate(@RequestBody TodoItem todoItem) {
        TodoItem result = new TodoItem();
        if (todoItem.getId() != null && todoItem.getStatus() != null) {
            result = TodoItemRepository.save(todoItem);
        } else {
            System.out.println("User Listsis bostur.");
        }
        return new ResponseEntity<User>(result, HttpStatus.CREATED);

    }
/*
    @PostMapping("/delete-todo-list")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5000"})
    public ResponseEntity<User> userDelete(@RequestBody Long userId) {
        //User result = new User();
        //System.out.println("User id bostur.");
        User user = TodoItemRepository.findById(userId);
        User result = user;
        if ( user.getFirstName() == null) {
            System.out.println("User id bostur.");
        } else {
            TodoItemRepository.delete(user);
        }
        return new ResponseEntity<User>(result, HttpStatus.CREATED);
    }

    // Set status of todo item
    @PostMapping("/todo-items/{todoListId}/{todoItemId}")
    @CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5000"})
    public ResponseEntity<User> userUpdate(@PathVariable("todoItemId") Long todoItemId, @PathVariable("todoListId") Long todoListId) {
        //User result = new User();
        if ( userId == null) {
            System.out.println("User id bostur.");
        } else {
            User user = TodoItemRepository.findById(userId);
            user.setStatus("b");
            System.out.println("User update edilecek.");
        }
        return new ResponseEntity<User>( HttpStatus.CREATED);
    }
*/

}
