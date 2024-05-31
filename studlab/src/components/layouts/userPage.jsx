import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import NavigationBar from "../partials/navigation-bar";
import Preview from '../partials/preview';

function UserPage() {
    
    const { id } = useParams();

    const [user, setUser] = useState(null);
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch(`https://studlab.marcosruizrubio.com/user/${id}`);
                if (!response.ok) {
                    throw new Error('Error al recuperar los documentos');
                }
                const data = await response.json();
                console.log(data);
                setUser(data);
                // Suponiendo que los documentos están anidados dentro del objeto de usuario como "documentos"
                setDocs(data.documentos || []);
            } catch (error) {
                console.log(error.message);
            } 
        }
        fetchUser();
    }, [id]);

    return (
        <div className="profile-page">
            {user ? (
                <div>
                    <div className='profile-header'>
                        <img className='profile-image' src={user.fotourl} alt="Foto de perfil" />
                        <div>
                            <h2>{user.nombre}</h2>
                        </div>
                    </div>
                    <div className="submit-form profile-info">
                        <div>
                            <label>Nombre:</label>
                            <input className='search-input' type="text" name="nombre" value={user.nombre} disabled />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input className='search-input' type="email" name="email" value={user.email} disabled />
                        </div>
                        <div>
                            <label>Teléfono:</label>
                            <input className='search-input' type="tel" name="telefono" value={user.telefono} disabled />
                        </div>
                        <div>
                            <label>Carrera:</label>
                            <input className='search-input' type="text" name="carrera" value={user.carrera} disabled />
                        </div>
                    </div>
                </div>
            ) : (
                <p>Cargando...</p>
            )}
            <div className='previews'>
                {docs.map((prev, index) => (
                    <Preview key={index} data={prev} />
                ))}
            </div>
            <NavigationBar />
        </div>
    );
}

export default UserPage;
