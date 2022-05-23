import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Buscador from './Buscador';

const url = `/api/pisos`;

const Pisos = ({ userGlobal }) => {
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

  const handlePrevious = () => {
    getInfo(`${paginationInfo["hydra:previous"]}`);
  }

  useEffect(() => {
    getInfo(url);
  }, []);

  useEffect(() => {
    console.log(jsonData);
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

        <Buscador setJsonData={setJsonData} />
      </section>

          <section className='pisos'>
            {pisos.map((piso) => (
              <Link to={'piso/' + piso.id.toString()} key={piso.id}>
                <div className="piso" >
                  <img src={piso.imagenes[0]} width="100px" height="100px"/>
                  <h4>{piso.titulo}</h4>
                  <p>{piso.ciudad}</p>
                </div>
              </Link>
            ))}

        
        {multiplePages ?
          paginationInfo["hydra:first"] === paginationInfo["@id"] ?
            null :
            <button onClick={handlePrevious} className="btn btn-lg btn-primary">Anterior</button> :
          null}

        {multiplePages ?
          paginationInfo["@id"] === paginationInfo["hydra:last"] ?
            null :
            <button onClick={handleNext} className="btn btn-lg btn-primary">Siguiente</button> :
          null}

      </section>
    </>
  )
}

export default Pisos