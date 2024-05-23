import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

function RegistrationPage() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [telefono, setTelefono] = useState("");
  const [carrera, setCarrera] = useState("");
  const [imagen, setImagen] = useState("");
  const navigate = useNavigate();

  function takePhoto() {
    Camera.getPhoto({
      source: CameraSource.Camera,
      quality: 90,
      width: 1024,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
    }).then(res => setImagen(res.dataUrl));
  }

  function pickFromGallery() {
    Camera.getPhoto({
      source: CameraSource.Photos,
      resultType: CameraResultType.DataUrl,
      width: 1024,
    }).then(res => setImagen(res.dataUrl));
  }

  function PrevisualizacionFoto() {
    if (imagen) {
      return <img src={imagen}/>;
    }
    return "";
  }

  return (
    <div className="login-page">
      <form>
        <p>Registro</p>
        <label htmlFor="nombre">Nombre completo</label>
        <input type="text" name="nombre" id="nombre" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre completo" required />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
        <label htmlFor="telefono">Número de teléfono</label>
        <input type="tel" name="telefono" id="telefono" value={telefono} onChange={e => setTelefono(e.target.value)} placeholder="Teléfono" />
        <label htmlFor="carrera">Carrera</label>
        <input type="text" name="carrera" id="carrera" value={carrera} onChange={e => setCarrera(e.target.value)} placeholder="Carrera" required />
        <label htmlFor="pwd">Contraseña</label>
        <input type="password" name="pwd" id="pwd" value={pwd} onChange={e => setPwd(e.target.value)} placeholder="Teléfono" required />
        <label>Imagen de perfil</label>
        <button type="button" onClick={takePhoto} >Hacer foto</button>
        <button type="button" onClick={pickFromGallery}>Elegir de la galería</button>
        <PrevisualizacionFoto/>
        <button id="enviar" type="submit">Registrarse</button>
      </form>
    </div>
  )
}
export default RegistrationPage;