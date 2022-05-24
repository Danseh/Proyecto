import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const myStorage2 = window.localStorage;
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
    console.log(logoutUrl);
    logout(logoutUrl);
    myStorage2.removeItem('loggedUser');
    setUserGlobal(false);
  }

  return (
    <div>
          <ul>
            <li>
              Bienvenido {userGlobal?.username}
            </li>
            <li>
              <img src={userGlobal.foto} alt="perfil" width="100px" height="100px"></img>
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
    </div>
  )
}

export default Panel