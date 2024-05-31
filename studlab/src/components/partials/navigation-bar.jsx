import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Preferences } from '@capacitor/preferences';
import { getSession } from '../../hooks/getSession';

function NavigationBar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkSession() {
      const userTmp = await getSession();
      if (!userTmp) {
        navigate("/login", { replace: true });
      } else {
        //console.log("USERTMP",userTmp);
        setUser(JSON.parse(userTmp.value));
      }
    }
    checkSession();
  }, []);

  if (!user) {
    return null;
  }
  else {
    return (
      <div className="nav-bar">
        <Link to="/home">
          <img src="/home.png" alt="Home" />
        </Link>
        <Link to="/search">
          <img src="/search.png" alt="Search" />
        </Link>
        <Link to="/new">
          <img src="/plus.png" alt="New" />
        </Link>
        <Link to="/notifications">
          <img src="/notification.png" alt="Notifications" />
        </Link>
        <Link to={`/profile`}>
          <div className="profile-pic">
            {user ? (
              <img src={user.fotourl} alt='Foto de perfil del usuario' />
            ) : (
              <img src="/user.png" alt='Foto de perfil por defecto' />
            )}
          </div>
        </Link>
      </div>
    );
  }
}

export default NavigationBar;
