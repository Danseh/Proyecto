import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Panel = ({userGlobal}) => {


  return (
    <div>
          <ul>
            <li>
              {userGlobal?.username ? `Bienvenido ${userGlobal?.username}` : `Bienvenido invitado` }
            </li>
            <li>
              <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="perfil" width="100px" height="100px"></img>
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
          </ul>
    </div>
  )
}

export default Panel