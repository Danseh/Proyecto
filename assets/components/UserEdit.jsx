import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const myStorageUserEdit = window.sessionStorage;

const UserEdit = ({userGlobal, setUserGlobal}) => {

  const params = useParams();

  const [user, setUser] = useState({});
  const [soyAdmin, setSoyAdmin] = useState(false);
  const [urlEditUser, setUrlEditUser] = useState("");
  const [currentUser, setCurrentUser] = useState(JSON.parse(myStorageUserEdit.getItem('loggedUser')));

  // estados form
  const [inputNombre, setInputNombre] = useState("");
  const [inputApellidos, setInputApellidos] = useState("");
  const [inputTelefono, setInputTelefono] = useState(0);
  const [inputEmail, setInputEmail] = useState("");
  const [inputSexo, setInputSexo] = useState("");
  const [inputEdad, setInputEdad] = useState(0);
  const [inputInformacion, setInputInformacion] = useState("");
  const [inputGustos, setInputGustos] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState("");

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
      
      setInputNombre(data.nombre);
      setInputApellidos(data.apellidos);
      setInputTelefono(data.telefono);
      setInputEmail(data.email);
      setInputSexo(data.sexo);
      setInputEdad(data.edad);
      setInputInformacion(data.informacion);
      setInputGustos(data.gustos);
      setFotoPerfil(data.foto);

      setUrlEditUser(`/user/${params.id}/edit`)

      if (currentUser.roles.includes("ROLE_ADMIN")){
        setSoyAdmin(true);
      }
      
    } catch (e) {
      console.log(e);
    }
  }

  const putUser = async (objectToUpload) => {
    //console.log(JSON.stringify(objectToUpload));
    try {
      const url = `/api/users/${params.id}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(objectToUpload)
      });

      if (response.status === 200) {
        $('.alert-success').show();
      }
      else {
        $('.alert-warning').show();
      }
      const data = await response.json();
      console.log(data);

      setUserGlobal(data);

      setUser(data);
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      nombre: inputNombre,
      apellidos: inputApellidos,
      telefono: inputTelefono,
      email: inputEmail,
      sexo: inputSexo,
      edad: inputEdad,
      informacion: inputInformacion,
      gustos: inputGustos,

    }
    //console.log(data);
    putUser(data);
  }

  const handleSubmitPassword = () => {
    $('.alert-success').show();
  }

  const handleChange = (e) => {
    if (e.target.name === "nombre") {
      setInputNombre(e.target.value);
    }

    if (e.target.name === "apellidos") {
      setInputApellidos(e.target.value);
    }

    if (e.target.name === "telefono") {
      setInputTelefono(parseInt(e.target.value));
    }

    if (e.target.name === "email") {
      setInputEmail(e.target.value);
    }

    if (e.target.name === "sexo") {
      setInputSexo(e.target.value);
    }

    if (e.target.name === "edad") {
      setInputEdad(parseInt(e.target.value));
    }

    if (e.target.name === "informacion") {
      setInputInformacion(e.target.value);
    }

    if (e.target.name === "gustos") {
      setInputGustos(e.target.value);
    }

  }

  const handleChangeImagen = () => {
    document.getElementById("formPerfil").submit();
  }

  useEffect(() => {
    getInfoUser();
  }, [])

  $(document).ready(
    function(){
        var theValue = inputSexo;
        $('option[value=' + theValue + ']')
          .attr('selected',true);
    }
    
  );

  return (
    <>
    {userGlobal.id == user.id || soyAdmin ?
    <div className="user-container">
      <div className="user-header">
        <div className="user-imagen">
        {fotoPerfil ?
        <img src={fotoPerfil} /> : 
        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" width="200px" height="200px" alt="perfil"></img>
        }

          <form action="subirFoto" method="post" id="formPerfil" encType="multipart/form-data">
            <input type="file" id="fotoPerfil" onChange={handleChangeImagen} name="fotoPerfil"/>
          </form>
        </div>
        <h1>{user.nombre} {user.apellidos}</h1>
      </div>

      <div className="user-titulo">

      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Informaci??n personal</button>
        </li>
        <li class="nav-item" role="presentation">
          <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Privacidad</button>
        </li>

      </ul>

      </div>

      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
      
          <form onSubmit={handleSubmit}>

          <div className='user-personal'>
            <div className="user-nombre">
              <h3>Nombre</h3>
              <input type="text" value={inputNombre} onChange={handleChange} name="nombre" pattern="[a-zA-Z??-??\s]+" title="El nombre solo puede contener letras"/>
            </div>
            <div className="user-apellidos">
              <h3>Apellidos</h3>
              <input type="text" value={inputApellidos} onChange={handleChange} name="apellidos" pattern="[a-zA-Z??-??\s]+" title="Los apellidos solo pueden contener letras"/>
            </div>
          </div>

          <div className='user-informacion'>
            <div className="user-telefono">
              <h3>Telefono</h3>
              <input type="number" value={inputTelefono} onChange={handleChange} name="telefono"/>
            </div>
            <div className="user-email">
              <h3>Email</h3>
              <input type="email" value={inputEmail} onChange={handleChange} name="email" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" title="Introduce un email v??lido"/>
            </div>
          </div>

          <div className='user-basico'>
            <div className="user-sexo">
              <h3>Sexo</h3>
              <select onChange={handleChange} name="sexo">
                <option value="Hombre">Hombre</option>
                <option value="Mujer">Mujer</option>
              </select>
            </div>
            <div className="user-edad">
              <h3>Edad</h3>
              <input type="number" value={inputEdad} onChange={handleChange} name="edad"/>
            </div>
          </div>

          <div className='user-about'>
            
            <div className="user-sobremi">
              <h3>Sobre mi</h3>
              <textarea value={inputInformacion} rows = "3" cols = "25" onChange={handleChange} name="informacion"/>
            </div>

            <div className="user-gustos">
              <h3>Gustos/intereses</h3>
              <textarea value={inputGustos} rows = "3" cols = "25" onChange={handleChange} name="gustos"/>
            </div>
          </div>

          <div className='form-guardar'>
            <input type="submit" value="Guardar" className="btn btn-lg btn-success" />
          </div>

          </form>
        </div>

        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">

            <form method="post" action={urlEditUser} onSubmit={handleSubmitPassword}>
              <h3>Cambiar contrase??a</h3>
              <div className="form-group">
                <input type="password" name="password" minlength="6" id="inputPassword" className="form-control" placeholder="Nueva contrase??a" autoComplete="password" />
              </div>  

              <div className='form-guardar'>
                <input type="submit" value="Actualizar contrase??a" className="btn btn-lg btn-success" />
              </div>

            </form>

        </div>

      </div>

      <div className="alert alert-success" data-dismiss="alert" role="alert">
        Perfil actualizado correctamente
      </div>
      <div className="alert alert-warning" data-dismiss="alert" role="alert">
        Fallo al actualizar el perfil
      </div>

    </div>
    : <h2>No tienes permiso para editar este usuario</h2> }
    </>
  )
}

export default UserEdit