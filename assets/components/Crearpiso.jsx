import React from 'react'

const Crearpiso = () => {

  return (
    <form method="post" action="publicarPiso"  id="formCreate" enctype="multipart/form-data">
        <h3 className="mb-3 mb-md-4 font-weight-normal">Publicar piso</h3>
        
        <div className="form-group">
          <label htmlFor="inputTitulo">Titulo </label>
          <input type="text" name="titulo" id="inputTitulo" className="form-control" autoComplete="username" required autoFocus />
        </div>

        <div className="form-group">
          <label htmlFor="inputCiudad">Ciudad</label>
          <input type="text" name="ciudad" id="inputCiudad" className="form-control" autoComplete="username" required />
        </div>

        <div className="form-group">
          <label htmlFor="inputCiudad">Dirección</label>
          <input type="text" name="direccion" id="inputDireccion" className="form-control" autoComplete="username" required />
        </div>

        <div className="form-group">
          <label htmlFor="inputDescripcion">Descripción</label>
          <input type="text" name="descripcion" id="inputDescripcion" className="form-control" autoComplete="username" required />
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