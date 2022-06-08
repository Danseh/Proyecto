import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {

  return (
    <>
    <Link to="/">
    <header>
      
      
        <img id="logo" src="/img/logo.png" alt="logo1" width="200px" height="150px" />
        <img id="logo" src="/img/logo122.png" alt="logo2" width="500px" height="100px"/>
        <img id="logo" src="/img/logo.png" alt="logo1" width="200px" height="150px" />
        
        {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li>
              <a className="nav-link no-link">{userGlobal?.username ? `Bienvenido ${userGlobal?.username}` : `Bienvenido invitado` }</a>
            </li>

            <li className="nav-item">
              {userGlobal?.username ? <a className="nav-link" onClick={handleLogout}>Cerrar sesión</a> : null }              
            </li>
          </ul>
        </div> */}
      
    </header>
    </Link>
    </>
  )
}

export default Header