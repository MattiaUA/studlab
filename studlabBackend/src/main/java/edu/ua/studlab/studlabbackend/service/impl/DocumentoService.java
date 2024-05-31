package edu.ua.studlab.studlabbackend.service.impl;

import edu.ua.studlab.studlabbackend.entities.Documento;
import edu.ua.studlab.studlabbackend.repository.DocumentoRepository;
import edu.ua.studlab.studlabbackend.service.IDocumentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DocumentoService implements IDocumentoService
{

    @Autowired
    private DocumentoRepository documentoRepository;

    @Override
    public List<Documento> find()
    {
        return (List<Documento>) documentoRepository.findAll();
    }

    @Override
    public Documento findById(int id) {
        return documentoRepository.findById(id).get();
    }

    @Override
    public Documento save(Documento documento)
    {
        if (documento.getDocumentourl().contains("mp4"))
        {
            documento.setFormato("mp4");
            documento.setDocumentourl("video_demo.mp4");
        }
        else if (documento.getDocumentourl().contains("pdf"))
        {
            documento.setFormato("pdf");
            documento.setDocumentourl("pdf_demo.pdf");
        }
        else if (documento.getDocumentourl().contains("png"))
        {
            documento.setFormato("png");
            documento.setDocumentourl("imagen.png");
        }
        return documentoRepository.save(documento);
    }

    @Override
    public void deleteById(int id) {
        documentoRepository.deleteById(id);
    }
}
