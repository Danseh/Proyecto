import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

const myStorage4 = window.sessionStorage;

const User = ({userGlobal}) => {

  const navigate = useNavigate();
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

  const handleVolver = () => {
    navigate(-1);
  }

  useEffect(() => {
    console.log(userGlobal);
    getInfoUser();
  }, [])

  return (
    <>
    <div className="user-container">
      <div className="user-header">
        <div className="user-imagen">
          {user.foto ?
            <img src={user.foto} /> : 
            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="perfil" width="200px" height="200px"/>
            }
        </div>
        <h1>{user.nombre} {user.apellidos}</h1>
      </div>
      
      <div className="user-titulo">
      <h1>Información personal</h1>
          {userGlobal.id == user.id ? 
           <Link to={'editar'}>
           <button type="button" class="btn btn-dark">Editar perfil</button>
           </Link>:
           null
          }
      </div>
        
      <div className='user-personal'>

        <div className="user-nombre">
            <h3>Nombre</h3>
            <p>{user.nombre}</p>
          </div>
          <div className="user-apellidos">
            <h3>Apellidos</h3>
            <p>{user.apellidos}</p>
          </div>

      </div>

      <div className='user-informacion'>

        <div className="user-telefono">
            <h3>Telefono</h3>
            <p>{user.telefono}</p>
          </div>
          <div className="user-email">
            <h3>Email</h3>
            <p>{user.email}</p>
          </div>

      </div>

      <div className='user-basico'>
        <div className="user-sexo">
          <h3>Sexo</h3>
          <p>{user.sexo}</p>
        </div>
        <div className="user-edad">
          <h3>Edad</h3>
          {user.edad ? <p>{user.edad} años</p> : null }
        </div>
      </div>

      <div className='user-about'>
        
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
    <div className="volver">
          <button className="btn btn-primary" onClick={handleVolver}>Volver</button>
    </div>   
    </>
  )
}

export default User