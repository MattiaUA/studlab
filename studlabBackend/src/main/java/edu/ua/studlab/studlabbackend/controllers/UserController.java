package edu.ua.studlab.studlabbackend.controllers;

import edu.ua.studlab.studlabbackend.entities.User;
import edu.ua.studlab.studlabbackend.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("/user")
public class UserController
{
    @Autowired
    private IUserService userService;

    @GetMapping("")
    public List<User> getAllUsers()
    {
        return userService.find();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable int id)
    {
        return new ResponseEntity<>(userService.findById(id), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<User> saveUser(@RequestBody User user)
    {
        return new ResponseEntity<>(userService.save(user), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable int id, @RequestBody User user)
    {
        try
        {
            return new ResponseEntity<>(userService.update(id, user), HttpStatus.CREATED);
        } catch (ChangeSetPersister.NotFoundException e)
        {
            Map<String, String> responseMap = new HashMap<>();
            responseMap.put("error", "No se pudo encontrar un trabajador con el id " + id);
            return new ResponseEntity<>(responseMap, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{email}/{password}")
    public ResponseEntity<?> login(@PathVariable String email, @PathVariable String password)
    {
        return new ResponseEntity<>(userService.login(email, password), HttpStatus.OK);
    }
}
