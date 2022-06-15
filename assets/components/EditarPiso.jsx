import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const myStorageEditarPiso = window.sessionStorage;

const EditarPiso = () => {

  const params = useParams();
  const [user, setUser] = useState(JSON.parse(myStorageEditarPiso.getItem('loggedUser')));
  const [soyOwner, setSoyOwner] = useState(false);
  const [urlEditPiso, setUrlEditPiso] = useState("");
  const [soyAdmin, setSoyAdmin] = useState(false);
  const [piso, setPiso] = useState({})

  // estados form
  const [inputTitulo, setInputTitulo] = useState("");
  const [inputCiudad, setInputCiudad] = useState("");
  const [inputDireccion, setInputDireccion] = useState("");
  const [inputDescripcion, setInputDescripcion] = useState("");
  const [inputPrecio, setInputPrecio] = useState(0);
  const [inputPlazas, setInputPlazas] = useState(0);

  const getInfoPiso = async () => {
    try {
      const url = `/api/pisos/${params.id}}`;
      let respuesta = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        },
      });

      let data = await respuesta.json();

      setPiso(data);

      setInputTitulo(data.titulo);
      setInputCiudad(data.ciudad);
      setInputDireccion(data.direccion);
      setInputDescripcion(data.descripcion);
      setInputPrecio(data.precio);
      setInputPlazas(data.plazas);

      setUrlEditPiso(`/piso/${params.id}/edit`)

      if (user) {

        if (user.id == data.owner.charAt(data.owner.length - 1)) {
          setSoyOwner(true);
        }

        if (user.roles.includes("ROLE_ADMIN")) {
          setSoyAdmin(true);
        }
        
      }
      
      l
      
    } catch (e) {
      console.log(e);
    }
  }

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

    if (e.target.name === "precio") {
      setInputPrecio(parseInt(e.target.value));
    }

    if (e.target.name === "plazas") {
      setInputPlazas(parseInt(e.target.value));
    }


  }

  useEffect(() => {
    getInfoPiso();
  }, [])


  $(function(){
    $("#imagenes").on("change", function(){

        if ($("#imagenes")[0].files.length<=5) {
          $("input[type='submit']").attr("disabled", false);
         
        }
        else {
          alert("Solo puedes subir un máximo de 5 fotos del piso");
          $("input[type='submit']").attr("disabled", true);
        }
    });    
  });

  return (
    <>
    {soyOwner || soyAdmin ? 
    <form method="post" action={urlEditPiso} className="formCreate" encType="multipart/form-data">
        <h3 className="mb-3 mb-md-4 font-weight-normal">Editar piso</h3>
        
        <div className="form-group">
          <label htmlFor="inputTitulo">Titulo </label>
          <input type="text" name="titulo" value={inputTitulo} id="inputTitulo" onInput={handleChange} className="form-control" pattern="[a-zA-ZÀ-ÿ\s]+" title="El titulo solo puede contener letras" autoComplete="titulo" autoFocus />
        </div>

        <div className="form-group">
          <label htmlFor="inputCiudad">Ciudad</label>
          <input type="text" name="ciudad" value={inputCiudad} id="inputCiudad" onInput={handleChange} className="form-control" pattern="[a-zA-ZÀ-ÿ\s]+" title="La ciudad solo puede contener letras" autoComplete="ciudad" />
        </div>

        <div className="form-group">
          <label htmlFor="inputCiudad">Dirección</label>
          <input type="text" name="direccion" value={inputDireccion} id="inputDireccion" onInput={handleChange} className="form-control" pattern="[a-zA-ZÀ-ÿ0-9º,./\s]+" title="La dirección solo puede algunos caracteres como º / , o ." autoComplete="direccion" />
        </div>

        <div className="form-group">
          <label htmlFor="inputDescripcion">Descripción</label>
          <textarea type="text" name="descripcion" value={inputDescripcion} id="inputDescripcion" onInput={handleChange} className="form-control" pattern="[a-zA-ZÀ-ÿ0-9\s]+" title="La descripción solo puede contener letras y números" autoComplete="descripcion"/>
        </div>

        <div className="form-group">
          <label htmlFor="inputPrecio">Precio al mes</label>
          <input type="number" name="precio" value={inputPrecio} id="inputPrecio" onInput={handleChange} className="form-control" autoComplete="precio" />
        </div>

        <div className="form-group">
          <label htmlFor="inputPlazas">Plazas máximas</label>
          <input type="number" name="plazas" value={inputPlazas} id="inputPlazas" onInput={handleChange} className="form-control" autoComplete="plazas" />
        </div>

        <div className="form-group">
          <label htmlFor="inputFechaDisp">Fecha próxima disponibilidad de plaza</label>
          <input type="date" name="fechaDisp" id="inputFechaDisp" className="form-control" autoComplete="fechaDisp"/>
        </div>

        <div className="form-group">
          <label htmlFor="imagenes">Imagenes</label>
          <input type="file" name="imagenes[]" id="imagenes" className="form-control"  multiple="multiple" />
        </div>
        <div align="center" className="crear">           
        <input className="btn btn-lg btn-primary" type="submit" value="Editar"/>
        </div>  


        
    </form>
    : <h1>No tienes permiso para editar este piso</h1>}
    </>
  )
}

export default EditarPiso