import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfilePic from "./profile-pic";
import { getSession } from "../../hooks/getSession";

async function updateDocumentComments(newComment) {
    try {
        const data = {
            "iddocumento": { "id": newComment.iddocumento },
            "idusuario": { "id": newComment.idusuario },
            "fecha": "2024-05-29",
            "comentario": newComment.comentario
        };

        const response = await fetch(`https://studlab.marcosruizrubio.com/comentario`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Error al actualizar el documento en el servidor");
        }
        const updatedDocument = await response.json();
        return updatedDocument;
    } catch (error) {
        console.error("Error al actualizar el documento:", error);
    }
}

function DocumentReelComments({ data }) {
    const [commentsRaw, setCommentsRaw] = useState(data.comentarios);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchComments() {
            try {
                const commentsList = await Promise.all(
                    commentsRaw.map(async (element) => {
                        const response = await fetch(`https://studlab.marcosruizrubio.com/comentario/${element.id}`);
                        return await response.json();
                    })
                );
                setComments(commentsList);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        }
        fetchComments();
    }, [commentsRaw]);

    useEffect(() => {
        async function checkSession() {
            const userTmp = await getSession();
            if (!userTmp) {
                navigate("/login", { replace: true });
            } else {
                setUser(JSON.parse(userTmp.value));
            }
        }
        checkSession();
    }, [navigate]);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = async () => {
        if (newComment.trim() === "") return;

        const newCommentObj = {
            idusuario: user.id, // Assuming the user ID for the new comment
            iddocumento: data.id, // ID of the current document
            comentario: newComment,
            fecha: new Date().toISOString().substring(0, 10) // Current date as ISO string
        };

        const updatedDocument = await updateDocumentComments(newCommentObj);
        // Update comments locally after submission
        setComments([...comments, updatedDocument]);
        setNewComment("");
    };

    return (
        <div className="document-comments">
            {comments.map((element, index) => (
                <div key={index}>
                    <div className="comment-header">
                        <ProfilePic userid={element.idusuario.id} />
                        <p><strong>{element.idusuario.nombre ? element.idusuario.nombre : user.nombre}</strong></p>
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
