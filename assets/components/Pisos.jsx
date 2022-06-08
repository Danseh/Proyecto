import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Buscador from './Buscador';

const url = `/api/pisos`;

const Pisos = () => {
  const [jsonData, setJsonData] = useState({});
  const [pisos, setPisos] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState({});
  const [multiplePages, setMultiplePages] = useState(false);


  const getInfo = async (url) => {
    try {
      let respuesta = await fetch(url);
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

export default Pisos