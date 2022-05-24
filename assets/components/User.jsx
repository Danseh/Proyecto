import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

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
      {user.foto ?
        <img src={user.foto} /> : 
        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="perfil"></img>
        }
        <h1>{user.username}</h1>
      </div>
      
      <div className="user-titulo">
      <h1>Información personal</h1>
          {userGlobal ? 
           <Link to={'editar'}>
           <button type="button" class="btn btn-dark">Editar perfil</button>
           </Link>:
           null
          }
      </div>

      <div className='user-basico'>
        <div className="user-sexo">
          <h4>Sexo</h4>
          <p>{user.sexo}</p>
        </div>
        <div className="user-edad">
          <h4>Edad</h4>
          <p>{user.edad} años</p>
        </div>
      </div>

      <div className='user-informacion'>
        
        <div className="user-sobremi">
          <h3>Sobre mi</h3>
          <p>{user.informacion}</p>
        </div>
        <div className="user-gustos">
          <h3>Gustos/aficiones</h3>
          <p>{user.gustos}</p>
        </div>
      </div>
    </div>
  )
}

export default User