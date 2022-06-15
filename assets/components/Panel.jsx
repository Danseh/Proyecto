import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const myStoragePanel = window.sessionStorage;
const logoutUrl =  `/logout`;

const Panel = ({userGlobal, setUserGlobal}) => {

  let url = "";

  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [piso, setPiso] = useState({});

  const getUserPiso = async (url) => {
    try {

      let respuesta = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        },
      });
      
      let data = await respuesta.json();

      setUser(data);

      if (data.piso) {
      let respuestaPiso = await fetch(data.piso, {
        headers: {
          'Accept': 'application/json',
        },
      });
      
      let dataPiso = await respuestaPiso.json();
      console.log(dataPiso);
      setPiso(dataPiso);

      url = `/api/users/${user.id}`;
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
    url = `/api/users/${userGlobal.id}`;
    getUserPiso(url);
  }, [])


  return (
      <>
      {user ?
      <div className="panel-container">
            <ul>
              <li>
                <h2>Bienvenido {user.nombre}</h2>
                
              </li>
              <li>
                <p>{user.foto ? <img src={user.foto} alt="perfil" width="200px" height="200px"></img> :
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
                <Link to="/pisosInteresado">
                <button type="button" class="btn btn-dark">Mis pisos interesado</button>
                </Link>
              </li>
              <li>
                <button type="button" class="btn btn-dark" onClick={handleLogout}>Cerrar sesión</button>
              </li>
            </ul>
            {piso.id ? 
              <div className="user-piso">
                <h2>Mi piso: </h2>
                <Link to={'piso/' + piso.id.toString()} key={piso.id}>
                  <div class="card">
                    <img class="card-img-top" src={piso.imagenes[0]} alt="Card image cap" />
                    <div class="card-body">
                      <h4 class="card-title">{piso.titulo}</h4>
                      <p className="card-text">{piso.ciudad}</p>
                      <p class="card-text">{piso.direccion}</p>
                      <p class="card-text">
                      {piso.estado === 'Disponible' ? 
                      <span className="disponible">Disponible</span> :
                      <span className="ocupado">Ocupado</span>}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
              :null}
      </div>
      : null}
    </>
  )
}

export default Panel