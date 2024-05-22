import React from "react";

function LoginPage() {
    return (
        <div className="login-page">
            <form>
                <p>Iniciar sesión</p>
                <label htmlFor="usuario">Usuario</label>
                <input className="" type="text" name="usuario" id="usuario" placeholder="Nombre de usuario"/>
                <label htmlFor="pass">Contraseña</label>
                <input type="password" name="pass" id="pass" placeholder="Contraseña"/>
                <button type="submit">Iniciar</button>
            </form>
        </div>
    )
}
export default LoginPage;