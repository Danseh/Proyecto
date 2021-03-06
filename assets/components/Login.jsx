import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const loginUrl = `/api/login`;

const Login = ({setUserGlobal}) => {
  const navigate = useNavigate();
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const fetchLogin = async (url, objectToUpload) => {
    //console.log(JSON.stringify(objectToUpload));
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(objectToUpload)
      });
      //console.log(response);
      const data = await response.json();
      console.log(data);
      if ("error" in data) {
        alert("Credenciales inválidas");
        return;
      }
      setUserGlobal(data);

    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputUsername.length === 0 || inputPassword.length === 0) {
      alert("Rellene todos los campos");
      return;
    }
    const data = {
      username: inputUsername,
      password: inputPassword
    }
    //console.log(data);
    fetchLogin(loginUrl, data);

    navigate("/");
  }

  const handleChange = (e) => {
    if (e.target.name === "username") {
      setInputUsername(e.target.value);
    }
    if (e.target.name === "password") {
      setInputPassword(e.target.value);
    }
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
        <h3 className="mb-3 mb-md-4 font-weight-normal">Log In</h3>
        
        <div className="form-group">
          <label htmlFor="inputUsername">Usuario </label>
          <input type="text" value={inputUsername} onChange={handleChange} name="username" id="inputUsername" className="form-control" autoComplete="username" placeholder="Nombre de usuario" autoFocus required />
        </div>

        <div className="form-group">
          <label htmlFor="inputPassword">Contraseña</label>
          <input type="password" value={inputPassword} onChange={handleChange} name="password" minlength="6" id="inputPassword" className="form-control" placeholder="Contraseña" autoComplete="password" required  />
        </div>
            
        <input type="hidden" name="_csrf_token" value="{{ csrf_token('authenticate') }}"/>
            
        <button className="btn btn-lg btn-primary" type="submit">
        Entrar
        </button>
        <p>¿No tiene una cuenta? <a href="/register">Crea una</a></p>
        
    </form>
  )
}

export default Login