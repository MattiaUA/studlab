import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import ProfilePic from './profile-pic';
import { useNavigate } from "react-router";
import { Motion } from '@capacitor/motion';

import { getSession } from '../../hooks/getSession';
import { Preferences } from '@capacitor/preferences';

function NavigationBar() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  // Para debugear. Cierra sesion si se agita el movil
  /*Motion.addListener('accel', event => {
    if (event.acceleration.x > 10) 
      Motion.removeAllListeners().then(() => Preferences.remove({ key: 'idUser' }).then(() => navigate("/login")));
  });*/

  // Si no se ha iniciado sesion, redirige a login
  useEffect(() => {
    async function checkSession() {
      const user = await getSession();

      if (!user) 
        navigate("/login", { replace: true });
      else
        setUser(user);
    }
    checkSession();
  });

  return (
    <div className="nav-bar">
      <Link to="/home">
        <img src="/home.png" alt="Home"></img>
      </Link>
      <Link to={"/search"}>
        <img src="/search.png" alt="Search"></img>
      </Link>
      <Link to={"/new"}>
        <img src="/plus.png" alt="New"></img>
      </Link>
      <Link to={"/notifications"}>
        <img src="/notification.png" alt="Notifications"></img>
      </Link>
      <Link to={"/profile"}>
        <div className="profile-pic">
            <img src={user.fotourl} alt='Foto de perfil del usuario'/>
        </div>
      </Link>
    </div>
  )
}

export default NavigationBar;