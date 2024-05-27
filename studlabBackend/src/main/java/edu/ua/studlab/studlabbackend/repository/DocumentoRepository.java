package edu.ua.studlab.studlabbackend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;

import edu.ua.studlab.studlabbackend.entities.Documento;

@NoRepositoryBean
public interface DocumentoRepository extends CrudRepository<Documento, Integer>
{
}