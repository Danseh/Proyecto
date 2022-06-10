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

      setUrlEditPiso(`piso/${params.id}/edit`)

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


  useEffect(() => {
    getInfoPiso();
  }, [])

  $(function(){
    $("#imagenes").on("change", function(){

        if ($("#imagenes")[0].files.length>5) {
         alert("Solo puedes subir un máximo de 5 fotos del piso");
        }
        else {
         $("input[type='submit']").attr("disabled", false);
        }
    });    
  });

  return (
    <>
    {soyOwner || soyAdmin ? 
    <form method="post" action={urlEditPiso}  id="formCreate" enctype="multipart/form-data">
        <h3 className="mb-3 mb-md-4 font-weight-normal">Publicar piso</h3>
        
        <div className="form-group">
          <label htmlFor="inputTitulo">Titulo </label>
          <input type="text" name="titulo" value={piso.titulo} id="inputTitulo" className="form-control" pattern="[a-zA-Z]{1,55}" title="El titulo solo puede contener letras" autoComplete="titulo" autoFocus />
        </div>

        <div className="form-group">
          <label htmlFor="inputCiudad">Ciudad</label>
          <input type="text" name="ciudad" value={piso.ciudad} id="inputCiudad" className="form-control" pattern="[a-zA-Z]{1,20}" title="La ciudad solo puede contener letras" autoComplete="ciudad" />
        </div>

        <div className="form-group">
          <label htmlFor="inputCiudad">Dirección</label>
          <input type="text" name="direccion" value={piso.direccion} id="inputDireccion" className="form-control" pattern="[a-zA-Z]{1,55}" title="La dirección solo puede contener letras" autoComplete="direccion" />
        </div>

        <div className="form-group">
          <label htmlFor="inputDescripcion">Descripción</label>
          <textarea type="text" name="descripcion" value={piso.descripcion} id="inputDescripcion" className="form-control" pattern="[a-zA-Z]{1,55}" title="La descripción solo puede contener letras" autoComplete="descripcion"/>
        </div>

        <div className="form-group">
          <label htmlFor="inputPrecio">Precio al mes</label>
          <input type="number" name="precio" value={piso.precio} id="inputPrecio" className="form-control" autoComplete="precio" />
        </div>

        <div className="form-group">
          <label htmlFor="inputPlazas">Plazas máximas</label>
          <input type="number" name="plazas" value={piso.plazas} id="inputPlazas" className="form-control" autoComplete="plazas" />
        </div>

        <div className="form-group">
          <label htmlFor="inputPlazas">Fecha próxima disponibilidad de plaza</label>
          <input type="date" name="FechaDisp" id="fechaDisp" className="form-control" autoComplete="fechaDisp"/>
        </div>

        <div className="form-group">
          <label htmlFor="imagenes">Imagenes</label>
          <input type="file" name="imagenes[]" id="imagenes" className="form-control"  multiple="multiple" />
        </div>
        <div align="center" id="crear">           
        <input className="btn btn-lg btn-primary" type="submit" value="Crear" disabled/>
        </div>  


        
    </form>
    : <h1>No tienes permiso para editar este piso</h1>}
    </>
  )
}

export default EditarPiso