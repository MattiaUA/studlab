import React, { useState } from "react";
import { Preferences } from '@capacitor/preferences';
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const navigate = useNavigate();

    // AQUI ALMACENO AL USUARIO INGRESADO EN LOCAL
    async function saveSession(user) {
        await Preferences.set({ key: 'UserData', value: JSON.stringify(user) });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const url = `https://studlab.marcosruizrubio.com/user/${email}/${pwd}`;
            const response = await fetch(url);

            if (response.ok) {
                const text = await response.text(); // Obtener el texto de la respuesta
                const data = text ? JSON.parse(text) : {}; // Parsear el texto solo si no está vacío

                if (Object.keys(data).length !== 0) {
                    await saveSession(data);
                    navigate('/home');
                } else {
                    alert("Verifica los datos de inicio de sesión.");
                }
            } else {
                alert("Error al intentar iniciar sesión. Por favor, intenta nuevamente.");
            }
        } catch (error) {
            console.error("Error en la petición:", error);
            alert("Hubo un error al intentar iniciar sesión. Por favor, intenta nuevamente.");
        }
    }

    return (
        <div className="login-page">
            <form onSubmit={handleSubmit}>
                <p>Iniciar sesión</p>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
                <label htmlFor="pwd">Contraseña</label>
                <input type="password" name="pwd" id="pwd" value={pwd} onChange={e => setPwd(e.target.value)} placeholder="Contraseña" required />
                <button id="enviar" type="submit">Iniciar</button>
                <Link to="/register">
                    Registrarse
                </Link>
            </form>
        </div>
    );
}

export default LoginPage;
