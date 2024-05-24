import React, { useState, useEffect } from "react";
import { Preferences } from '@capacitor/preferences';
import { useNavigate } from 'react-router-dom';
import { getSession } from '../../hooks/getSession';

function DocumentRegister({ userData, documentData }) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [carrera, setCarrera] = useState("");
  const [formato, setFormato] = useState("");
  const [asignatura, setAsignatura] = useState("");
  const [tema, setTema] = useState("");
  const [file, setFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const user = await getSession();
      if (!user) {
        navigate("/login", { replace: true });
      } else {
        setUser(user);
      }
    };
    checkSession();
  }, [navigate]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const fileExtension = selectedFile.name.split('.').pop();
      setFormato(fileExtension);
    }
  };

  const handleCoverImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setCoverImage(selectedImage);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("No se ha podido obtener la información del usuario.");
      return;
    }

    const currentDate = new Date().toISOString().split('T')[0];
    console.log(documentData.documentos)
    const newDocument = {
      titulo,
      id: documentData.documentos.length + 1,
      idusuario: user.id,
      descripcion,
      imagendeportada: coverImage ? URL.createObjectURL(coverImage) : "",
      visualizaciones: 0,
      documentourl: file ? URL.createObjectURL(file) : "",
      formato,
      carrera,
      asignatura,
      tema,
      fecha: currentDate,
    };

    const updatedDocuments = {
      ...documentData,
      documentos: [...documentData.documentos, newDocument]
    };

    try {
      await Preferences.set({ key: 'DocumentData', value: JSON.stringify(updatedDocuments) });
      alert("Documento subido con éxito");
    } catch (error) {
      console.error('Error saving document data to preferences:', error);
      alert("Error al subir el documento");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="submit-form">
      <h1>Publicar un documento</h1>
      <div>
        <label>Título</label>
        <input className="search-input" type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
      </div>
      <div>
        <label>Descripción</label>
        <textarea className="search-input" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
      </div>
      <div>
        <label>Carrera</label>
        <input className="search-input" type="text" value={carrera} onChange={(e) => setCarrera(e.target.value)} />
      </div>
      <div>
        <label>Asignatura</label>
        <input className="search-input" type="text" value={asignatura} onChange={(e) => setAsignatura(e.target.value)} />
      </div>
      <div>
        <label>Tema</label>
        <input className="search-input" type="text" value={tema} onChange={(e) => setTema(e.target.value)} />
      </div>
      <div>
        <label>Subir Archivo</label>
        <input className="search-input" type="file" onChange={handleFileChange} />
      </div>
      <div>
        <label>Subir Imagen de Portada</label>
        <input className="search-input" type="file" onChange={handleCoverImageChange} />
      </div>
      <button className="search-input" type="submit">Subir Documento</button>
    </form>
  );
}

export default DocumentRegister;
