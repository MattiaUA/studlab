import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import NavigationBar from "../partials/navigation-bar";
import { getSession } from '../../hooks/getSession';
import { Preferences } from '@capacitor/preferences';
import { useNavigate } from "react-router";
import UsersData from '../../exampledata/Users.json';
import DocumentData from '../../exampledata/Documents.json'
import Preview from '../partials/preview';
import parsePrev from './../../hooks/parsePrev';

function UserPage({ docData }) {
    const { id } = useParams();
    const userId = parseInt(id);
    const user = UsersData.find(user => user.id === userId);
    const documentos = DocumentData.documentos.filter(doc => doc.idusuario === userId);
    const parse = documentos.map(doc => ({
        DocId: doc.id,
        userId: user.id,
        title: doc.titulo,
        docImg: doc.imagendeportada,
        theme: doc.tema,
        userName: user.nombre,
        userPicture: user.fotourl,
        format: doc.formato,
    }));
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
                {/* Mapear y mostrar los documentos */}
                {parse.map((prev, index) => (
                    <div >
                        <Preview key={index} data={prev} />
                    </div>
                ))}
            </div>
            <NavigationBar></NavigationBar>
        </div>
    );
}


export default UserPage;
