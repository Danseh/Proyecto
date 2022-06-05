import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const myStorage2 = window.sessionStorage;
const logoutUrl =  `/logout`;

const Panel = ({userGlobal, setUserGlobal}) => {

  const logout = async (url) => {
    try {
      await fetch(url);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout(logoutUrl);
    myStorage2.removeItem('loggedUser');
    setUserGlobal(false);
  }

  useEffect(() => {
    
  }, [])
  return (
    <div>
      {userGlobal ?
            <ul>
              <li>
                <h2>Bienvenido {userGlobal?.nombre}</h2>
                
              </li>
              <li>
                <p>{userGlobal.foto ? <img src={userGlobal.foto} alt="perfil" width="150px" height="150px"></img> :
                <img src="/img/perfilDefault.jpg" alt="perfilDefault" width="150px" height="150px"></img>}
                </p>
              </li>
              <li>
                <Link to={'user/' + userGlobal.id.toString()}>
                <button type="button" class="btn btn-dark">Mi perfil</button>
                </Link>
              </li>
              <li>
                <Link to="/">
                <button type="button" class="btn btn-dark">Buscar pisos</button>
                </Link>
              </li>
              <li>
                <Link to="/crearpiso">
                <button type="button" class="btn btn-dark">Publicar piso</button>
                </Link>
              </li>
              <li>
                <button type="button" class="btn btn-dark" onClick={handleLogout}>Cerrar sesión</button>
              </li>
            </ul>
          : null}
    </div>
  )
}

export default Panel