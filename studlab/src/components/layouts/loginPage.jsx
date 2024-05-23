import React, {useState} from "react";

import UsersData from '../../exampledata/Users.json';
import { Preferences } from '@capacitor/preferences';
import { useNavigate } from "react-router";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const navigate = useNavigate();

    async function saveSession(user) {
        await Preferences.set({ key: 'idUser', value: JSON.stringify(user.id) });
    }

    function handleSubmit(e) {
        e.preventDefault();
        for (const user of UsersData) {
            if (user.email === email && user.pwd === pwd) {
                saveSession(user).then(() => {
                    navigate('/');
                });
                return;
            }
        }

        //TODO: Poner algo mas bonito
        alert("Credenciales incorrectas");
    }

    return (
        <div className="login-page">
            <form onSubmit={handleSubmit}>
                <p>Iniciar sesión</p>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"/>
                <label htmlFor="pwd">Contraseña</label>
                <input type="password" name="pwd" id="pwd" value={pwd} onChange={e => setPwd(e.target.value)}  placeholder="Contraseña"/>
                <button type="submit">Iniciar</button>
            </form>
        </div>
    )
}
export default LoginPage;