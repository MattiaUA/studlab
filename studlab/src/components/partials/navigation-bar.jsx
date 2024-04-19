import React from 'react'
import ProfilePic from '../profile-pic';

function NavigationBar({ user }) {
  return (
    <div className="nav-bar">
      <a href={`/`}>
        <img src="/home.png" alt="Home"></img>
      </a>
      <a href={`search`}>
        <img src="/search.png" alt="Search"></img>
      </a>
      <a href={`new`}>
        <img src="/plus.png" alt="New"></img>
      </a>
      <a href={`notifications/`}>
        <img src="/notification.png" alt="Notifications"></img>
      </a>
      <ProfilePic user={user}></ProfilePic>
    </div>
  )
}

export default NavigationBar;