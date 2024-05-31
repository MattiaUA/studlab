package edu.ua.studlab.studlabbackend.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "Users", schema = "studlab")
public class User
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;

    @Size(max = 255)
    @Column(name = "nombre")
    private String nombre;

    @Size(max = 255)
    @Column(name = "email")
    private String email;

    @Size(max = 20)
    @Column(name = "telefono", length = 20)
    private String telefono;

    @Size(max = 255)
    @Column(name = "pwd")
    private String pwd;

    @Size(max = 255)
    @Column(name = "carrera")
    private String carrera;

    @Size(max = 1000)
    @Column(name = "fotourl")
    private String fotourl;

    @JsonIgnoreProperties(value = {"idusuario", "handler","hibernateLazyInitializer"}, allowSetters = true)
    @OneToMany(mappedBy = "idusuario")
    private Set<Documento> documentos = new LinkedHashSet<>();

    public int getId()
    {
        return id;
    }

    public void setId(int id)
    {
        this.id = id;
    }

    public String getNombre()
    {
        return nombre;
    }

    public void setNombre(String nombre)
    {
        this.nombre = nombre;
    }

    public String getEmail()
    {
        return email;
    }

    public void setEmail(String email)
    {
        this.email = email;
    }

    public String getTelefono()
    {
        return telefono;
    }

    public void setTelefono(String telefono)
    {
        this.telefono = telefono;
    }

    public String getPwd()
    {
        return pwd;
    }

    public void setPwd(String pwd)
    {
        this.pwd = pwd;
    }

    public String getCarrera()
    {
        return carrera;
    }

    public void setCarrera(String carrera)
    {
        this.carrera = carrera;
    }

    public String getFotourl()
    {
        return fotourl;
    }

    public void setFotourl(String fotourl)
    {
        this.fotourl = fotourl;
    }

    public Set<Documento> getDocumentos()
    {
        return documentos;
    }

    public void setDocumentos(Set<Documento> documentos)
    {
        this.documentos = documentos;
    }

}