package edu.ua.studlab.studlabbackend.service;

import edu.ua.studlab.studlabbackend.entities.User;
import org.springframework.data.crossstore.ChangeSetPersister;

import java.util.List;

public interface IUserService
{
    public List<User> find();
    public User findById(int id);
    public User save(User user);
    public User update(int id, User user) throws ChangeSetPersister.NotFoundException;
    public User login(String email, String password);
}
