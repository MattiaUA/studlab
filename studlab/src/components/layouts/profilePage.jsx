import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import NavigationBar from "../partials/navigation-bar";
import { getSession } from '../../hooks/getSession';
import { Preferences } from '@capacitor/preferences';
import Preview from '../partials/preview';

function ProfilePage() {
    const navigate = useNavigate();
    const [docs, setDocuments] = useState([]);
    const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);
    const [formValues, setFormValues] = useState({});

    useEffect(() => {
        async function checkSessionAndFetchData() {
            const userTmp = await getSession();
            if (!userTmp) {
                navigate("/login", { replace: true });
            } else {
                const data = JSON.parse(userTmp.value);
                setUser(data);

                const response = await fetch('https://studlab.marcosruizrubio.com/documento');
                if (!response.ok) {
                    throw new Error('Error al recuperar los documentos');
                }

                const documents = await response.json();
                const selfDocs = documents.filter(doc => doc.idusuario.id === data.id);
                setDocuments(selfDocs);
            }
        }

        checkSessionAndFetchData();
    }, [navigate]);

    useEffect(() => {
        const loadUser = () => {
            try {
                if (user != null) {
                    setFormValues({
                        nombre: user.nombre,
                        email: user.email,
                        telefono: user.telefono,
                        carrera: user.carrera
                    });
                }
            } catch (error) {
                console.error('Error loading user data:', error);
            }
        };

        loadUser();
    }, [user]);

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleLogout = () => {
        Preferences.remove({ key: 'UserData' }).then(() => navigate("/login"));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://studlab.marcosruizrubio.com/user/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formValues) // Use formValues directly
            });
    
            if (!response.ok) {
                throw new Error('Error updating user');
            }
    
            const updatedUser = await response.json();
            setUser(updatedUser);
            setFormValues({
                nombre: updatedUser.nombre,
                email: updatedUser.email,
                telefono: updatedUser.telefono,
                carrera: updatedUser.carrera
            });
            setEditing(false);
            console.log('Formulario enviado:', formValues);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://studlab.marcosruizrubio.com/documento/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error('Error deleting document');
            }

            setDocuments(prevDocs => prevDocs.filter(doc => doc.id !== id));
            console.log(`Documento con ID: ${id} eliminado`);
        } catch (error) {
            console.error(`Error al eliminar el documento con ID: ${id}`, error);
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
                {Array.isArray(docs) && docs.map((prev, index) => (
                    <div key={index}>
                        <Preview key={index} data={prev} />
                        <button className='search-input' onClick={() => handleDelete(prev.id)}>Eliminar</button>
                    </div>
                ))}
            </div>
            <NavigationBar />
        </div>
    );
}

export default ProfilePage;
