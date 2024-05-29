package edu.ua.studlab.studlabbackend.controllers;

import edu.ua.studlab.studlabbackend.entities.Documento;
import edu.ua.studlab.studlabbackend.service.IDocumentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("/documento")
public class DocumentoController
{
    @Autowired
    private IDocumentoService documentoService;

    @GetMapping("")
    public List<Documento> getAllDocumentos()
    {
        return documentoService.find();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Documento> getDocumentoById(@PathVariable int id)
    {
        return new ResponseEntity<>(documentoService.findById(id), HttpStatus.OK);
    }
    
    @PostMapping("")
    public ResponseEntity<Documento> saveDocumento(@RequestBody Documento documento)
    {
        return new ResponseEntity<>(documentoService.save(documento), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDocumento(@PathVariable int id)
    {
        documentoService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}