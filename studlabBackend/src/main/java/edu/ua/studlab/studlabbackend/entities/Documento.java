package edu.ua.studlab.studlabbackend.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "Documentos", schema = "studlab")
public class Documento
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;

    @Size(max = 255)
    @Column(name = "titulo")
    private String titulo;

    @JsonIgnoreProperties(value = {"documentos", "handler","hibernateLazyInitializer"}, allowSetters = true)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idusuario")
    private User idusuario;

    @Lob
    @Column(name = "descripcion")
    private String descripcion;

    @Size(max = 255)
    @Column(name = "imagendeportada")
    private String imagendeportada;

    @Column(name = "visualizaciones")
    private int visualizaciones;

    @Size(max = 1000)
    @Column(name = "documentourl")
    private String documentourl;

    @Size(max = 50)
    @Column(name = "formato", length = 50)
    private String formato;

    @Size(max = 255)
    @Column(name = "carrera")
    private String carrera;

    @Size(max = 255)
    @Column(name = "tema")
    private String tema;

    @Size(max = 255)
    @Column(name = "asignatura")
    private String asignatura;

    @Column(name = "fecha")
    private LocalDate fecha;

    @JsonIgnoreProperties(value = {"iddocumento", "idusuario", "handler", "hibernateLazyInitializer"}, allowSetters = true)
    @OneToMany(mappedBy = "iddocumento", orphanRemoval = true, cascade = CascadeType.REMOVE)
    private Set<Comentario> comentarios = new LinkedHashSet<>();

    public int getId()
    {
        return id;
    }

    public void setId(int id)
    {
        this.id = id;
    }

    public String getTitulo()
    {
        return titulo;
    }

    public void setTitulo(String titulo)
    {
        this.titulo = titulo;
    }

    public User getIdusuario()
    {
        return idusuario;
    }

    public void setIdusuario(User idusuario)
    {
        this.idusuario = idusuario;
    }

    public String getDescripcion()
    {
        return descripcion;
    }

    public void setDescripcion(String descripcion)
    {
        this.descripcion = descripcion;
    }

    public String getImagendeportada()
    {
        return imagendeportada;
    }

    public void setImagendeportada(String imagendeportada)
    {
        this.imagendeportada = imagendeportada;
    }

    public int getVisualizaciones()
    {
        return visualizaciones;
    }

    public void setVisualizaciones(int visualizaciones)
    {
        this.visualizaciones = visualizaciones;
    }

    public String getDocumentourl()
    {
        return documentourl;
    }

    public void setDocumentourl(String documentourl)
    {
        this.documentourl = documentourl;
    }

    public String getFormato()
    {
        return formato;
    }

    public void setFormato(String formato)
    {
        this.formato = formato;
    }

    public String getCarrera()
    {
        return carrera;
    }

    public void setCarrera(String carrera)
    {
        this.carrera = carrera;
    }

    public String getTema()
    {
        return tema;
    }

    public void setTema(String tema)
    {
        this.tema = tema;
    }

    public String getAsignatura()
    {
        return asignatura;
    }

    public void setAsignatura(String asignatura)
    {
        this.asignatura = asignatura;
    }

    public LocalDate getFecha()
    {
        return fecha;
    }

    public void setFecha(LocalDate fecha)
    {
        this.fecha = fecha;
    }

    public Set<Comentario> getComentarios()
    {
        return comentarios;
    }

    public void setComentarios(Set<Comentario> comentarios)
    {
        this.comentarios = comentarios;
    }

}