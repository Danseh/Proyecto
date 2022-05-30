import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Piso = ({userGlobal}) => {
  
  const params = useParams();
  const [piso, setPiso] = useState({});
  const [imagenes, setImagenes] = useState([]);
  const [miembros, setMiembros] = useState([]);
  const [interesados, setInteresados] = useState([]);
  const [index, setIndex] = useState(0);
  const [owner, setOwner] = useState(false);

  const getInfoPiso = async () => {
    try {
      const url = `/api/pisos/${params.id}`;
      let respuesta = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        },
      });
      
      let data = await respuesta.json();

      setPiso(data);

      setImagenes(data.imagenes);
      setMiembros(data.miembros);
      setInteresados(data.interesados);

      if (userGlobal.id == piso.owner) {
        setOwner(true);
      }
      
    } catch (e) {
      console.log(e);
    }
  }

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    getInfoPiso();
    
  }, [])


  return (
    <div className="piso-container">
    
      <div className="piso-header">
        <Carousel activeIndex={index} onSelect={handleSelect} dynamicHeight="True" width="100%">
          {imagenes.map((imagen) =>(
              <div>
                <img src={imagen} />
              </div>

          ))}

        </Carousel>
          <div className="piso-header-container">
            <div className="piso-titulo">
            <h1>{piso.titulo}</h1>
            <a class="btn btn-primary" href="#" role="button">Link</a>
            </div>

            <div className="piso-miembros">
                <h2>Miembros</h2>
                <div className="piso-listaMiembros">
                  <ul>
                  {miembros.map((miembro) => 
                    <li>{miembro.nombre} {owner ? <a href="#"></a> : null}</li>
                    
                  )}
                  </ul>
                </div>
            </div>
          </div>
      </div>

    
    </div>


  )
}

export default Piso