import React from 'react'
import { Link } from "react-router-dom";
import ProfilePic from './profile-pic';

function NavigationBar({ user }) {
  return (
    <div className="nav-bar">
      <Link to="home">
        <img src="/home.png" alt="Home"></img>
      </Link>
      <Link to={"search"}>
        <img src="/search.png" alt="Search"></img>
      </Link>
      <Link to={"new"}>
        <img src="/plus.png" alt="New"></img>
      </Link>
      <Link to={"notifications"}>
        <img src="/notification.png" alt="Notifications"></img>
      </Link>
      <ProfilePic user={user}></ProfilePic>
    </div>
  )
}

export default NavigationBar;