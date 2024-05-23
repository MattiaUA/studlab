import React, {useState} from "react";
import { useNavigate } from "react-router";

function RegistrationPage() {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [telefono, setTelefono] = useState("");
    const [carrera, setCarrera] = useState("");
    const navigate = useNavigate();

    return (
        <div className="login-page">
            <form>
                <p>Registro</p>
                <label htmlFor="nombre">Nombre completo</label>
                <input type="text" name="nombre" id="nombre" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre completo" required/>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required/>
                <label htmlFor="telefono">Número de teléfono</label>
                <input type="tel" name="telefono" id="telefono" value={telefono} onChange={e => setTelefono(e.target.value)} placeholder="Teléfono"/>
                <label htmlFor="carrera">Carrera</label>
                <input type="text" name="carrera" id="carrera" value={carrera} onChange={e => setCarrera(e.target.value)} placeholder="Carrera" required/>
                <label htmlFor="pwd">Contraseña</label>
                <input type="password" name="pwd" id="pwd" value={pwd} onChange={e => setPwd(e.target.value)}  placeholder="Teléfono" required/>
                <button type="submit">Registrarse</button>
            </form>
        </div>
    )
}
export default RegistrationPage;