package edu.ua.studlab.studlabbackend.repository;

import edu.ua.studlab.studlabbackend.entities.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends CrudRepository<User, Integer>
{
    @Query("SELECT u FROM User u WHERE u.email = :email AND u.pwd = :password")
    User login(@Param("email") String email, @Param("password") String password);
}