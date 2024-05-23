import React, { useState } from "react";

function DocumentRegister({ userData, documentData, setDocumentData }) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [carrera, setCarrera] = useState("");
  const [formato, setFormato] = useState("");
  const [asignatura, setAsignatura] = useState("");
  const [tema, setTema] = useState("");
  const [file, setFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const currentDate = new Date().toISOString().split('T')[0];

    const newDocument = {
      titulo,
      id: documentData.documentos.length + 1,  // Generar un nuevo id basado en la longitud actual del array
      idusuario: userData.id,
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

    console.log(newDocument);

    const updatedDocuments = {
      ...documentData,
      documentos: [...documentData.documentos, newDocument]
    };

    setDocumentData(updatedDocuments);

    alert("Documento subido con éxito");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Título</label>
        <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
      </div>
      <div>
        <label>Descripción</label>
        <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
      </div>
      <div>
        <label>Carrera</label>
        <input type="text" value={carrera} onChange={(e) => setCarrera(e.target.value)} />
      </div>
      <div>
        <label>Asignatura</label>
        <input type="text" value={asignatura} onChange={(e) => setAsignatura(e.target.value)} />
      </div>
      <div>
        <label>Tema</label>
        <input type="text" value={tema} onChange={(e) => setTema(e.target.value)} />
      </div>
      <div>
        <label>Subir Archivo</label>
        <input type="file" onChange={handleFileChange} />
      </div>
      <div>
        <label>Subir Imagen de Portada</label>
        <input type="file" onChange={handleCoverImageChange} />
      </div>
      <button type="submit">Subir Documento</button>
    </form>
  );
}

export default DocumentRegister;
