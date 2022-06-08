import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const myStoragePanel = window.sessionStorage;
const logoutUrl =  `/logout`;

const Panel = ({userGlobal, setUserGlobal}) => {

  const navigate = useNavigate();

  const [user, setUser] = useState(JSON.parse(myStoragePiso.getItem('loggedUser')));
  const [piso, setPiso] = useState({});

  const getUserPiso = async () => {
    try {
      const url = `/api/users/${user.id}`;
      let respuesta = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        },
      });
      
      let data = await respuesta.json();

      if (data.piso) {
      let respuestaPiso = await fetch(data.piso, {
        headers: {
          'Accept': 'application/json',
        },
      });
      
      let dataPiso = await respuestaPiso.json();
      console.log(dataPiso);
      setPiso(dataPiso);

    }



    } catch (e) {
      console.log(e);
    }
  }

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
    myStoragePanel.removeItem('loggedUser');
    setUserGlobal(false);

    navigate("/");
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
                <Link to="/pisosPublicados">
                <button type="button" class="btn btn-dark">Mis pisos publicados</button>
                </Link>
              </li>
              <li>
                <button type="button" class="btn btn-dark" onClick={handleLogout}>Cerrar sesión</button>
              </li>
              <li>
              <Link to={'piso/' + piso.id.toString()} key={piso.id}>
                <div class="card">
                  <img class="card-img-top" src={piso.imagenes[0]} alt="Card image cap" />
                  <div class="card-body">
                    <h5 class="card-title">{piso.titulo}</h5>
                    <p class="card-text">{piso.direccion}</p>
                    <p class="card-text">
                    {piso.estado === 'Disponible' ? 
                    <span className="disponible">Disponible</span> :
                    <span className="ocupado">Ocupado</span>}
                    </p>
                  </div>
                </div>
              </Link>
              </li>
            </ul>
          : null}
    </div>
  )
}

export default Panel