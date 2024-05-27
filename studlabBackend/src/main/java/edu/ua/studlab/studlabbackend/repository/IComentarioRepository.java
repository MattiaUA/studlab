package edu.ua.studlab.studlabbackend.repository;

import org.springframework.data.repository.CrudRepository;

import edu.ua.studlab.studlabbackend.entities.Comentario;

public interface IComentarioRepository extends CrudRepository<Comentario, Integer>
{
}
