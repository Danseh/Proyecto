import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const UserEdit = () => {

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

  const handleChange = () => {
    document.getElementById("formPerfil").submit();
  }

  useEffect(() => {
    getInfoUser();

  }, [])

  return (
    <div className="user-container">
      <div className="user-header-editar">
        <div className="user-imagen">
        {user.foto ?
        <img src={user.foto} /> : 
        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="perfil"></img>
        }

          <form action="subirFoto" method="post" id="formPerfil" enctype="multipart/form-data">
            <input type="file" id="fotoPerfil" onChange={handleChange} name="fotoPerfil"/>
          </form>
        </div>
        <h1>{user.username}</h1>
      </div>

      <div className="user-titulo">
      <h1>Información personal</h1>

      </div>
    
      <form>

      <div className='user-basico'>
        <div className="user-sexo">
          <h3>Sexo</h3>
          <input type="text" value={user.sexo}/>
        </div>
        <div className="user-edad">
          <h3>Edad</h3>
          <input type="text" value={user.edad}/>
        </div>
      </div>
      <div className='user-informacion'>
        
        <div className="user-sobremi">
          <h3>Sobre mi</h3>
          <input type="text" value={user.informacion}/>
        </div>

        <div className="user-gustos">
          <h3>Gustos/aficiones</h3>
          <input type="text" value={user.gustos}/>
        </div>
      </div>

      <div className='form-guardar'>
        <input type="submit" value="Guardar" className="btn btn-lg btn-primary"/>
      </div>
      </form>
    </div>
  )
}

export default UserEdit