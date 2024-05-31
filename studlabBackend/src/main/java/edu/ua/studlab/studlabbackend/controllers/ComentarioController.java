package edu.ua.studlab.studlabbackend.controllers;

import edu.ua.studlab.studlabbackend.entities.Comentario;
import edu.ua.studlab.studlabbackend.service.IComentarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("/comentario")
public class ComentarioController
{
    @Autowired
    private IComentarioService comentarioService;

    @GetMapping("")
    public List<Comentario> getAllComentarios()
    {
        return comentarioService.find();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Comentario> getComentarioById(@PathVariable int id)
    {
        return new ResponseEntity<>(comentarioService.findById(id), HttpStatus.OK);
    }
    
    @PostMapping("")
    public ResponseEntity<Comentario> saveComentario(@RequestBody Comentario comentario)
    {
        return new ResponseEntity<>(comentarioService.save(comentario), HttpStatus.CREATED);
    }
}
