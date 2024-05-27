package edu.ua.studlab.studlabbackend.service;

import java.util.List;

import edu.ua.studlab.studlabbackend.entities.Comentario;


public interface IComentarioService
{
    public List<Comentario> findAll();
    public Comentario findById(Integer id);
    public Comentario save(Comentario comentario);
}
