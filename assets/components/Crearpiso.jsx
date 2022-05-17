import React, { useState } from 'react'

const postUrl = `/api/pisosPublicados`;


const Crearpiso = ({userGlobal}) => {
  const today = new Date();
  const [inputTitulo, setInputTitulo] = useState("");
  const [inputCiudad, setInputCiudad] = useState("");
  const [inputDireccion, setInputDireccion] = useState("");
  const [inputDescripcion, setInputDescripcion] = useState("");


  const fetchPost = async (url, objectToUpload) => {
    //console.log(JSON.stringify(objectToUpload));
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: objectToUpload
      });
      //console.log(response);
      const data = await response.json();
      console.log(data);
      // console.log(userGlobal);

    } catch (error) {
      console.log(error);
    }
  };

  // const handleSubmit = (e) => {
  //   let formData = new FormData();  
  //   e.preventDefault();
  //   if (inputTitulo.length === 0 || inputCiudad.length === 0 || inputDescripcion.length === 0) {
  //     alert("Rellene todos los campos");
  //     return;
  //   }
  //   const data = {
  //     titulo: inputTitulo,
  //     ciudad: inputCiudad,
  //     direccion: inputDireccion,
  //     descripcion: inputDescripcion,
  //   }
  //   for (let key in data) {
  //     formData.append(key, data[key]);
  //   }
  //   console.log(formData);
  //   //console.log(data);
  //   fetchPost(postUrl, formData);
  // }

  const handleChange = (e) => {
    if (e.target.name === "titulo") {
      setInputTitulo(e.target.value);
    }
    if (e.target.name === "ciudad") {
      setInputCiudad(e.target.value);
    }
    if (e.target.name === "direccion") {
      setInputDireccion(e.target.value);
    }
    if (e.target.name === "descripcion") {
      setInputDescripcion(e.target.value);
    }

  }
  // onSubmit={handleSubmit}
  return (
    <form method="post" action="publicarPiso"  id="formCreate" enctype="multipart/form-data">
        <h3 className="mb-3 mb-md-4 font-weight-normal">Publicar piso</h3>
        
        <div className="form-group">
          <label htmlFor="inputTitulo">Titulo </label>
          <input type="text" value={inputTitulo} onChange={handleChange} name="titulo" id="inputTitulo" className="form-control" autoComplete="username" required autoFocus />
        </div>

        <div className="form-group">
          <label htmlFor="inputCiudad">Ciudad</label>
          <input type="text" value={inputCiudad} onChange={handleChange} name="ciudad" id="inputCiudad" className="form-control" autoComplete="username" required />
        </div>

        <div className="form-group">
          <label htmlFor="inputCiudad">Dirección</label>
          <input type="text" value={inputDireccion} onChange={handleChange} name="direccion" id="inputDireccion" className="form-control" autoComplete="username" required />
        </div>

        <div className="form-group">
          <label htmlFor="inputDescripcion">Descripción</label>
          <input type="text" value={inputDescripcion} onChange={handleChange} name="descripcion" id="inputDescripcion" className="form-control" autoComplete="username" required />
        </div>
        <div className="form-group">
          <label htmlFor="imagenes">Imagenes</label>
          <input type="file" name="imagenes[]" id="imagenes" className="form-control"  multiple="multiple" required />
        </div>
            
        <input type="hidden" name="_csrf_token" value="{{ csrf_token('authenticate') }}"/>
            
        <button className="btn btn-lg btn-primary" type="submit">
        <p>Crear</p>
        </button>

        
    </form>
  )
}

export default Crearpiso