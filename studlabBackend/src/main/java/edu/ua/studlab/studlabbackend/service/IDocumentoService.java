package edu.ua.studlab.studlabbackend.service;
import java.util.List;
import edu.ua.studlab.studlabbackend.entities.Documento;
public interface IDocumentoService
{
    public List<Documento> findAll();
    public Documento findById(Integer id);
    public Documento save(Documento documento);
    public void deleteById(Integer id);
}
