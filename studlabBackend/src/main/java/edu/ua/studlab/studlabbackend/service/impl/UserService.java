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
        user.setFotourl("https://fastly.picsum.photos/id/9/150/150.jpg?hmac=apemF25iF2NOJDpnV-bDx6V28WnNVpjWDq10PO1Mn3A");
        return userRepository.save(user);
    }

    @Override
    public User update(int id, User user) throws ChangeSetPersister.NotFoundException
    {
        if(!userRepository.existsById(id)) throw new ChangeSetPersister.NotFoundException();
        User completeUser = userRepository.findById(id).get();
        user.setId(id);
        user.setFotourl(completeUser.getFotourl());
        user.setPwd(completeUser.getPwd());
        return userRepository.save(user);
    }

    @Override
    public User login(String email, String password)
    {
        return userRepository.login(email, password);
    }
}
