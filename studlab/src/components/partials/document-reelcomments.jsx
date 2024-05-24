import React, { useState } from "react";
import ProfilePic from "./profile-pic";
import UsersData from '../../exampledata/Users.json';
import DocumentsData from '../../exampledata/Documents.json'; // Importa los documentos
import fs from 'fs'; // Necesario para escribir en el sistema de archivos (sólo en backend)

function findUser(id) {
    const user = UsersData.filter(user => user.id === id)[0];
    return user;
}

function updateDocumentComments(documentId, newComment) {
    const document = DocumentsData.documentos.find(doc => doc.id === documentId);
    if (document) {
        document.comentarios.push(newComment);
        document.cantidadcomentarios += 1;

        // Escribir de vuelta en el archivo JSON (esto solo funcionará en un entorno backend, no en el navegador)
        fs.writeFile('../../exampledata/Documents.json', JSON.stringify(DocumentsData, null, 2), err => {
            if (err) {
                console.error('Error writing to JSON file:', err);
            } else {
                console.log('Successfully updated JSON file');
            }
        });
    }
}

function DocumentReelComments({ data }) {
    const [comments, setComments] = useState(Object.values(data.comentarios));
    const [newComment, setNewComment] = useState("");

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = () => {
        if (newComment.trim() === "") return;

        const newCommentObj = {
            id: comments.length + 1, // Unique ID for the new comment
            idusuario: 1, // Assuming the user ID for the new comment (replace with actual user ID)
            iddocumento: data.id, // ID of the current document
            comentario: newComment,
            fecha: new Date().toISOString().substring(0, 10) // Current date as ISO string
        };

        setComments([...comments, newCommentObj]);
        setNewComment("");

        // Actualizar el JSON local
        updateDocumentComments(data.id, newCommentObj);
    };

    return (
        <div className="document-comments">
            {comments.map(element => (
                <div key={element.id}>
                    <div className="comment-header">
                        <ProfilePic user={findUser(element.idusuario)} />
                        <p><strong>{findUser(element.idusuario).nombre}</strong></p>
                    </div>
                    <p>{element.comentario}</p>
                    <p style={{ color: "#A2A2A2" }}>{element.fecha}</p>
                </div>
            ))}
            <div className="add-comment">
                <textarea
                    value={newComment}
                    onChange={handleCommentChange}
                    placeholder="Escribe un comentario..."
                />
                <button className="search-input" onClick={handleCommentSubmit}>Añadir Comentario</button>
            </div>
        </div>
    );
}

export default DocumentReelComments;
