package edu.ua.studlab.studlabbackend.service.impl;

import edu.ua.studlab.studlabbackend.entities.Comentario;
import edu.ua.studlab.studlabbackend.repository.ComentarioRepository;
import edu.ua.studlab.studlabbackend.service.IComentarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComentarioService implements IComentarioService
{

    @Autowired
    private ComentarioRepository comentarioRepository;

    @Override
    public List<Comentario> find()
    {
        return (List<Comentario>) comentarioRepository.findAll();
    }

    @Override
    public Comentario findById(int id) {
        return comentarioRepository.findById(id).get();
    }

    @Override
    public Comentario save(Comentario comentario)
    {
        return comentarioRepository.save(comentario);
    }
}
