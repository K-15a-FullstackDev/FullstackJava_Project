package com.coursehubk.controller;

import com.coursehubk.dto.UserDTO;
import com.coursehubk.model.User;
import com.coursehubk.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    
    @PostMapping("/create")
    public ResponseEntity<UserDTO> createUser(@Valid @RequestBody User user) {
        User savedUser = userRepository.save(user);
        UserDTO dto = new UserDTO(savedUser.getId(), savedUser.getName(), savedUser.getEmail());
        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }

   
    @GetMapping("/all")
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(user -> new UserDTO(user.getId(), user.getName(), user.getEmail()))
                .collect(Collectors.toList());
    }

   
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        if (email == null || password == null) {
            return ResponseEntity.badRequest().body("Email and password are required");
        }

        User user = userRepository.findByEmail(email);
        if (user != null && user.getPassword().equals(password)) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
}
