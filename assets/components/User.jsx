import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const User = ({userGlobal}) => {

  const params = useParams();
  const [user, setUser] = useState({});

  const getInfoUser = async () => {
    try {
      const url = `/api/users/${params.id}`;
      let respuesta = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        },
      });
      
      let data = await respuesta.json();
      
      setUser(data);
      
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getInfoUser();

  }, [])

  return (
    <div className="user-container">
      <div className="user-header">
        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="perfil" width="200px" height="200px"></img>
        <h1>{user.username}</h1>
      </div>

      <h1>Información personal</h1>

      <div className='user-basico'>
        <p>Sexo: {user.sexo}</p>
        <p>Edad: {user.edad}</p>
      </div>

      <div className='user-informacion'>
        
      </div>
    </div>
  )
}

export default User