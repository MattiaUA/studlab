import React, { useState } from "react";
import ProfilePic from "../partials/profile-pic";
import UsersData from '../../exampledata/Users.json';
import NavigationBar from "../partials/navigation-bar";
import DocumentsData from '../../exampledata/Documents.json'; // Imp

function findUser(id) {
    const user = UsersData.filter(user => user.id === id)[0];
    return user;
}

function NotificationsPage({ data }) {
    const [comments, setComments] = useState(Object.values(data.comentarios));

    return (
        <div className="document-page">
            <div className="document-comments">
                {comments.map(element => (
                    <div key={element.id}>
                        <div className="comment-header">
                            <ProfilePic userid={element.idusuario} />
                            <p><strong>{findUser(element.idusuario).nombre} ha comentado en {data.titulo}</strong></p>
                        </div>
                        <p>{element.comentario}</p>
                        <p style={{ color: "#A2A2A2" }}>{element.fecha}</p>
                    </div>
                ))}
            </div>
            <NavigationBar />
        </div>
    );
}
export default NotificationsPage;