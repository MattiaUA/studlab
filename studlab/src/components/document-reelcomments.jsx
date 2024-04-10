import React from "react";
import ProfilePic from "./profile-pic";
import UsersData from '../exampledata/Users.json';

function findUser(id) {
    const user = UsersData.filter(user => user.id === id)[0];
    return user;
}



function DocumentReelComments({data}){
    const comments = Object.values(data["comentarios"])
    console.log(comments)
    return (
        <div className="document-comments">
            {comments.map(element => (
                <div key={element.id}>
                    <div className="comment-header">
                        <ProfilePic user={findUser(element.idusuario)}></ProfilePic>
                        <p><strong>{findUser(element.idusuario).nombre}</strong></p>
                    </div>
                    <p>{element.comentario}</p>
                    <p style={{color:"#A2A2A2"}}>{element.fecha}</p>
                </div>
            ))}
        </div>
    )
}
export default DocumentReelComments;