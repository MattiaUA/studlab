import React from "react";
import ProfilePic from "./profile-pic";

import UsersData from '../../exampledata/Users.json';

function findUser(id) {
    const user = UsersData.filter(user => user.id === id)[0];
    return user;
}

function DocumentInfo({ data }) {
    const user = findUser(data.idusuario);
    return (
        <div className="document-info">
            <div className="document-info-header">
                <div>
                    <h1>{data.titulo}</h1>
                    <h2>{user.nombre}</h2>
                </div>
                <ProfilePic user={user}></ProfilePic>
            </div>
            <br></br>
            <p>{data.descripcion}</p>
            <br></br>
            <p><strong>Fecha: </strong>{data.fecha}</p>
            <p><strong>Tipo: </strong>{data.formato}</p>
            <p><strong>Tema: </strong>{data.carrera}</p>
            <br />
            <div style={{ display: "flex",flexDirection:"row",height: "fit-content",width:"10px" }}>
                <img src="/eye.png" alt="views icon"></img>
                <p>{data.visualizaciones}</p>
            </div>
            <br />
            <img src="/cc.png" alt="Creative commons logo"></img>
        </div>
    )
}

export default DocumentInfo;