import React, { useState, useEffect } from 'react';
import NavigationBar from "../partials/navigation-bar";
import { getSession } from '../../hooks/getSession';
import parsePrev from '../../hooks/parsePrev';
import { Preferences } from '@capacitor/preferences';
import { useNavigate } from "react-router";
import UsersData from '../../exampledata/Users.json';
import DocumentData from '../../exampledata/Documents.json'
import Preview from '../partials/preview';

function ProfilePage({ docData }) {
    const [user, setUser] = useState("");
    const navigate = useNavigate();
    const [filterDoc, setFilterDoc] = useState(docData);

    useEffect(() => {
        async function checkSession() {
            const user = await getSession();
            if (!user)
                navigate("/login", { replace: true });
            else
                setUser(user);
            setFilterDoc({ 'documentos': docData["documentos"].filter(doc => doc.idusuario === user.id) });
        }
        checkSession();
    }, [navigate]);

    const prevData = parsePrev(filterDoc, UsersData);

    const [editing, setEditing] = useState(false);
    const [formValues, setFormValues] = useState({});

    useEffect(() => {
        const loaduser = () => {
            try {
                setFormValues({
                    nombre: user.nombre,
                    email: user.email,
                    telefono: user.telefono,
                    carrera: user.carrera
                });
            } catch (error) {
                console.error('Error loading user data:', error);
            }
        };
        loaduser();
    }, [user]);

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleLogout = () => {
        Preferences.remove({ key: 'idUser' }).then(() => navigate("/login"));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Formulario enviado:', formValues);
            setEditing(false);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    return (
        <div className="profile-page">
            {user ? (
                <div>
                    <div className='profile-header'>                    
                        <img className='profile-image' src={user.fotourl} alt="Foto de perfil" />
                        <div>
                        <h2>{user.nombre}</h2>
                        {editing ? null : <button onClick={handleEditClick} className='search-input profile-button'>Editar</button>}
                        <button onClick={handleLogout} className='profile-button search-input danger-button' >Logout</button>
                        </div>
                    </div>
                    {editing ? (
                        <form onSubmit={handleSubmit} className="submit-form">
                            <div>
                                <label>Nombre:</label>
                                <input className='search-input' type="text" name="nombre" value={formValues.nombre} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label>Email:</label>
                                <input className='search-input' type="email" name="email" value={formValues.email} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label>Teléfono:</label>
                                <input className='search-input' type="tel" name="telefono" value={formValues.telefono} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label>Carrera:</label>
                                <input className='search-input' type="text" name="carrera" value={formValues.carrera} onChange={handleInputChange} />
                            </div>
                            <button className='search-input' type="submit">Guardar</button>
                        </form>
                    ) : (
                        <div className="submit-form profile-info">
                            <div>
                                <label>Nombre:</label>
                                <input className='search-input' type="text" name="nombre" value={formValues.nombre} disabled />
                            </div>
                            <div>
                                <label>Email:</label>
                                <input className='search-input' type="email" name="email" value={formValues.email} disabled />
                            </div>
                            <div>
                                <label>Teléfono:</label>
                                <input className='search-input' type="tel" name="telefono" value={formValues.telefono} disabled />
                            </div>
                            <div>
                                <label>Carrera:</label>
                                <input className='search-input' type="text" name="carrera" value={formValues.carrera} disabled />
                            </div>
                            
                        </div>
                    )}
                </div>
            ) : (
                <p>Cargando...</p>
            )}
            <div className='previews'>
                {prevData.map((prev, index) => (
                    <div key={index}>
                        <Preview key={index} data={prev} />
                        <button className='search-input'>Eliminar</button>
                    </div>

                ))}
            </div>
            <NavigationBar></NavigationBar>
        </div>
    );
}

export default ProfilePage;
