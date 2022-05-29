import React from 'react'

const Crearpiso = () => {

  $(function(){
    $("#imagenes").on("change", function(){

        if ($("#imagenes")[0].files.length>5) {
         alert("Solo puedes subir un máximo de 5 fotos del piso");
        }
    });    
  });

  return (
    <form method="post" action="publicarPiso"  id="formCreate" enctype="multipart/form-data">
        <h3 className="mb-3 mb-md-4 font-weight-normal">Publicar piso</h3>
        
        <div className="form-group">
          <label htmlFor="inputTitulo">Titulo </label>
          <input type="text" name="titulo" id="inputTitulo" className="form-control" autoComplete="titulo" required autoFocus />
        </div>

        <div className="form-group">
          <label htmlFor="inputCiudad">Ciudad</label>
          <input type="text" name="ciudad" id="inputCiudad" className="form-control" autoComplete="ciudad" required />
        </div>

        <div className="form-group">
          <label htmlFor="inputCiudad">Dirección</label>
          <input type="text" name="direccion" id="inputDireccion" className="form-control" autoComplete="direccion" required />
        </div>

        <div className="form-group">
          <label htmlFor="inputDescripcion">Descripción</label>
          <input type="text" name="descripcion" id="inputDescripcion" className="form-control" autoComplete="descripcion" required />
        </div>

        <div className="form-group">
          <label htmlFor="inputPrecio">Precio al mes</label>
          <input type="text" name="precio" id="inputPrecio" className="form-control" autoComplete="precio" required />
        </div>

        <div className="form-group">
          <label htmlFor="inputPlazas">Plazas máximas</label>
          <input type="number" name="plazas" id="inputPlazas" className="form-control" autoComplete="plazas" required />
        </div>

        <div className="form-group">
          <label htmlFor="imagenes">Imagenes</label>
          <input type="file" name="imagenes[]" id="imagenes" className="form-control"  multiple="multiple" required />
        </div>
                     
        <input className="btn btn-lg btn-primary" type="submit" value="Crear"/>
  


        
    </form>
  )
}

export default Crearpiso