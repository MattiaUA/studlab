import React, { useEffect, useState } from 'react';
import ProfilePic from './profile-pic';

function UsuariosReel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('https://studlab.marcosruizrubio.com/user');
        if (!response.ok) {
          throw new Error('Error al recuperar los usuarios');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="usuarios-reel">
      {users.map((user, index) => (
        <ProfilePic key={index} userid={user.id} />
      ))}
    </div>
  );
}

export default UsuariosReel;
