import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const url = `/api/pisos`;

const Pisos = () => {
  const params = useParams();
  const [jsonData, setJsonData] = useState({});
  const [pisos, setPisos] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState({});
  const [multiplePages, setMultiplePages] = useState(false);


  const getInfo = async (url) => {
    try {
      let respuesta = await fetch(`${url}?ciudad=${params.ciudad}`);
      let data = await respuesta.json();
      //console.log(data);
      setJsonData(data);
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleNext = () => {
    getInfo(`${paginationInfo["hydra:next"]}`);
  }

  const handleFirst = () => {
    getInfo(`${paginationInfo["hydra:first"]}`);
  }

  const handlePrevious = () => {
    getInfo(`${paginationInfo["hydra:previous"]}`);
  }

  useEffect(() => {
    getInfo(url);
  }, []);

  useEffect(() => {

    if ("hydra:member" in jsonData) {
      setPisos(jsonData["hydra:member"]);
    }
    if ("hydra:view" in jsonData) {
      if ("hydra:first" in jsonData["hydra:view"]) {
        setPaginationInfo(jsonData["hydra:view"]);
        setMultiplePages(true);
      } else {
        setPaginationInfo({});
        setMultiplePages(false);
      }
    }
  }, [jsonData])


  return (
    <>
      <section className="buscador">

        <h1>Pisos en {params.ciudad}</h1>
      </section>

          <section className='pisos'>
            {pisos.map((piso) => (
              <Link to={'piso/' + piso.id.toString()} key={piso.id}>
                <div className="piso" >
                <img src={piso.imagenes[0]} width="200px" height="200px"/>
                  <div className="piso-content">
                    <h2>{piso.titulo}</h2>
                      <div className="piso-info">
                        <p>Ciudad: {piso.ciudad}</p>
                        <p>Estado: &nbsp;
                          {piso.estado === 'Disponible' ? 
                          <span className="disponible">Disponible</span> :
                          <span className="ocupado">Ocupado</span>}
                        </p>
                        
                        <p>Plazas: {piso.miembros.length} / {piso.plazas}</p>
                      </div>
                      <div className="piso-extra">
                        <h2>{piso.precio}€/mes</h2>
                        {piso.estado === 'Ocupado' ? 
                          <p>Fecha disponibilidad: 27/05/1994{piso.fechaDisponible}</p> :
                          null}
                      </div>
                  </div>
                </div>
              </Link>
            ))}

        <div className="paginacion">

        {multiplePages ?
          paginationInfo["@id"] === paginationInfo["hydra:last"] ?
          <button onClick={handleFirst} className="btn btn-lg btn-primary">Ir a primera</button> :
          
            <button onClick={handleNext} className="btn btn-lg btn-primary">Siguiente</button> :
          null}

          
        {multiplePages ?
          paginationInfo["hydra:first"] === paginationInfo["@id"] ?
            null :
            <button onClick={handlePrevious} className="btn btn-lg btn-primary">Anterior</button> :
          null}


      </div>
      </section>
    </>
  )
}

export default Pisos