package edu.ua.studlab.studlabbackend.service;

import edu.ua.studlab.studlabbackend.entities.Documento;
import org.springframework.data.crossstore.ChangeSetPersister;

import java.util.List;
public interface IDocumentoService
{
    public List<Documento> find();
    public Documento findById(Integer id);
    public Documento save(Documento documento);
    public void deleteById(Integer id);
}
