package edu.ua.studlab.studlabbackend.repository;

import org.springframework.data.repository.CrudRepository;

import edu.ua.studlab.studlabbackend.entities.User;

public interface UserRepository extends CrudRepository<User, Integer>
{
}
