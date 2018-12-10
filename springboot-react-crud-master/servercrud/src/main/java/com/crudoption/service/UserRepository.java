package com.crudoption.service;


import java.util.List;

import com.crudoption.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

    public User findById(Long id);
    public User findByusername(String username);
    
}
