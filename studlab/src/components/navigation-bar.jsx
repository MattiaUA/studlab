import React from 'react'

function NavigationBar() {
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
      <a href={`profile`}>
        <img src="/user.png" alt="Profile"></img>
      </a>
    </div>
  )
}

export default NavigationBar;