import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Buscador from './Buscador';

const myStoragePisosPublicados = window.sessionStorage;

const PisosPublicados = () => {
  const [jsonData, setJsonData] = useState({});
  const [pisos, setPisos] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState({});
  const [multiplePages, setMultiplePages] = useState(false);
  const [user, setUser] = useState(JSON.parse(myStoragePisosPublicados.getItem('loggedUser')));
  const [tienePisos, setTienePisos] = useState([]);

  const getInfo = async () => {
    try {
      const url = `/api/pisos?owner=${user.id}`;
      let respuesta = await fetch(url);
      let data = await respuesta.json();
      setTienePisos(data["hydra:member"]);
        
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
    getInfo();
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

  $('.card').on('mouseenter', '.piso', function () {
    $(this).css("border", "2px solid #ffbf75 ");
  });

  $('.card').on('mouseleave', '.piso', function () {
    $(this).css("border", "1px solid black");
  });



  return (
    <>
    <div className="pisos-content">
      <section className="buscador">

        <Buscador setJsonData={setJsonData} />
      </section>
      
          {tienePisos.length ?
          <section className='pisos'>
            {pisos.map((piso) => (
              <Link to={'piso/' + piso.id.toString()} key={piso.id}>
                <div class="card">
                  <img class="card-img-top" src={piso.imagenes[0]} alt="Card image cap" />
                  <div class="card-body">
                    <h5 class="card-title">{piso.titulo}</h5>
                    <p class="card-text">{piso.direccion}</p>
                    <p class="card-text">
                    {piso.estado === 'Disponible' ? 
                    <span className="disponible">Disponible</span> :
                    <span className="ocupado">Ocupado</span>}
                    </p>

                  </div>
                </div>
              </Link>
            ))}
        </section>
        : <h1 align="center">Aún no has publicado ningún piso</h1>}
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
        </div>
      
    </>
  )
}

export default PisosPublicados