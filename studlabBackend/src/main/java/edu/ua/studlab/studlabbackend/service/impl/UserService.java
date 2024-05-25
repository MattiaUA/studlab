package edu.ua.studlab.studlabbackend.service.impl;

import edu.ua.studlab.studlabbackend.entities.User;
import edu.ua.studlab.studlabbackend.repository.UserRepository;
import edu.ua.studlab.studlabbackend.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements IUserService
{
    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> find()
    {
        return (List<User>) userRepository.findAll();
    }

    @Override
    public User findById(int id)
    {
        return userRepository.findById(id).get();
    }

    @Override
    public User save(User user)
    {
        return userRepository.save(user);
    }

    @Override
    public User update(int id, User user) throws ChangeSetPersister.NotFoundException
    {
        if(!userRepository.existsById(id)) throw new ChangeSetPersister.NotFoundException();
        return userRepository.save(user);
    }

    @Override
    public User login(String email, String password)
    {
        return userRepository.login(email, password);
    }
}
