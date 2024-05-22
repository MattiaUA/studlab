import React from 'react'
import { Link } from "react-router-dom";
import ProfilePic from './profile-pic';
import UsersData from '../../exampledata/Users.json';

function NavigationBar() {
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
      <ProfilePic user={UsersData[0]}></ProfilePic>
    </div>
  )
}

export default NavigationBar;