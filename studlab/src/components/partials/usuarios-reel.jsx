import React from 'react'
import ProfilePic from '../profile-pic';

function UsuariosReel({ users }) {
  return (
    <div className="usuarios-reel">
      <ProfilePic user={users[0]}></ProfilePic>
      <ProfilePic user={users[1]}></ProfilePic>
      <ProfilePic user={users[2]}></ProfilePic>
      <ProfilePic user={users[3]}></ProfilePic>
      <ProfilePic user={users[4]}></ProfilePic>
    </div>
  )
}

export default UsuariosReel;