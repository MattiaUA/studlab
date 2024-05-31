package edu.ua.studlab.studlabbackend.repository;

import org.springframework.data.repository.CrudRepository;

import edu.ua.studlab.studlabbackend.entities.Documento;

public interface DocumentoRepository extends CrudRepository<Documento, Integer>
{
}