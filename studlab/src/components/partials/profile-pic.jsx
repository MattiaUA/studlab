import React from 'react';
import { useEffect,useState } from 'react';

function ProfilePic({userid}) {

  const [user,setUser] = useState("");

  useEffect(() => {
    async function getProfile(userid) {
      try {
        const response = await fetch(`https://studlab.marcosruizrubio.com/user/${userid}`);
  
        if (!response.ok) {
          throw new Error("Error al obtener el usuario en el servidor");
        }
        const user = await response.json();
        setUser(user);
        //console.log(user)
      } catch (error) {
        console.error("Error al actualizar el documento:", error);
      }
    }
    getProfile(userid)
  },[])

  return (
    <div className="profile-pic">
      <a href={`/profile/${user.id}`}>
        <img src={user.fotourl} />
      </a>
    </div>
  );
}

export default ProfilePic;
