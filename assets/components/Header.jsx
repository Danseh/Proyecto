import React from 'react'
import { Link } from 'react-router-dom';

const myStorage2 = window.localStorage;
const logoutUrl =  `/logout`;

const Header = () => {

  return (
    <header>
      
        {/* <Link to="/"><img id="logo" src="/img/logo.png" alt="logoHLANZ" /></Link> */}
        <h1>Live With Me</h1>
        
        {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li>
              <a className="nav-link no-link">{userGlobal?.username ? `Bienvenido ${userGlobal?.username}` : `Bienvenido invitado` }</a>
            </li>
            <li className="nav-item">
              {userGlobal?.roles?.find(rol => rol === "ROLE_ADMIN") ? <a className="nav-link" href="/admin">Panel de administración</a> : null}
            </li>
            <li className="nav-item">
              {userGlobal?.username ? <a className="nav-link" onClick={handleLogout}>Cerrar sesión</a> : null }              
            </li>
          </ul>
        </div> */}
      
    </header>
  )
}

export default Header