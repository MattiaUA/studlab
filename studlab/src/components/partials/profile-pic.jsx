import React from 'react';

function ProfilePic( {user}) {
  return (
    <div className="profile-pic">
      <a href={`profile/${user.id}`}>
        <img src={user.fotourl} alt='Foto de perfil del usuario'/>
      </a>
    </div>
  );
}

export default ProfilePic;
