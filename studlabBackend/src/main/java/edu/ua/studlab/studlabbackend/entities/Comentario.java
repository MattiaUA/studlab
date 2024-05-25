package edu.ua.studlab.studlabbackend.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "Comentarios", schema = "studlab")
public class Comentario
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;

    @JsonIgnoreProperties(value = {"comentarios", "handler","hibernateLazyInitializer"}, allowSetters = true)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idusuario")
    private User idusuario;

    @JsonIgnoreProperties(value = {"handler", "hibernateLazyInitializer"})
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "iddocumento")
    private Documento iddocumento;

    @Lob
    @Column(name = "comentario")
    private String comentario;

    @Column(name = "fecha")
    private LocalDate fecha;

    public Integer getId()
    {
        return id;
    }

    public void setId(Integer id)
    {
        this.id = id;
    }

    public User getIdusuario()
    {
        return idusuario;
    }

    public void setIdusuario(User idusuario)
    {
        this.idusuario = idusuario;
    }

    public Documento getIddocumento()
    {
        return iddocumento;
    }

    public void setIddocumento(Documento iddocumento)
    {
        this.iddocumento = iddocumento;
    }

    public String getComentario()
    {
        return comentario;
    }

    public void setComentario(String comentario)
    {
        this.comentario = comentario;
    }

    public LocalDate getFecha()
    {
        return fecha;
    }

    public void setFecha(LocalDate fecha)
    {
        this.fecha = fecha;
    }

}