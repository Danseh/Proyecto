import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Pisos from './Pisos';

const myStoragePiso = window.sessionStorage;
let urlUser = "";

const Piso = ({userGlobal}) => {
  
  const navigate = useNavigate();
  const params = useParams();
  // const user = JSON.parse(myStorage5.getItem('loggedUser'));
  const [user, setUser] = useState(JSON.parse(myStoragePiso.getItem('loggedUser')));
  const [piso, setPiso] = useState({});
  const [imagenes, setImagenes] = useState([]);
  const [miembros, setMiembros] = useState([]);
  const [interesados, setInteresados] = useState([]);
  const [index, setIndex] = useState(0);
  const [soyOwner, setSoyOwner] = useState(false);
  const [soyMiembro, setSoyMiembro] = useState(false);
  const [soyInteresado, setSoyInteresado] = useState(false);
  const [soyAdmin, setSoyAdmin] = useState(false);
  const [urlRemovePiso, setUrlRemovePiso] = useState("");

  const getInfoPiso = async () => {
    try {
      const url = `/api/pisos/${params.id}`;

      if (user) {
        urlUser = `/api/users/${user.id}`;
        
        if (user.roles.includes("ROLE_ADMIN")) {
          setSoyAdmin(true);
        }
      }

      let respuesta = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        },
      });
      
      let data = await respuesta.json();

      setUrlRemovePiso(`piso/${data.id}/remove`)

      setPiso(data);

      setImagenes(data.imagenes);

    //obtener miembros
    data.miembros.forEach(async (miembro) => {
        
      let respuestaMiembro = await fetch(miembro, {
        headers: {
          'Accept': 'application/json',
        },
      });
      
      let nuevoMiembro = await respuestaMiembro.json();

      console.log(nuevoMiembro);
      
      setMiembros(prevMiembro => [...prevMiembro, nuevoMiembro]);

    })

    if (user) {
    //obtener interesados  
    data.interesados.forEach(async (interesado) => {
        
        let respuestaInteresado = await fetch(interesado, {
          headers: {
            'Accept': 'application/json',
          },
        });
        
        let nuevoInteresado = await respuestaInteresado.json();

        console.log(nuevoInteresado);
        
        setInteresados(prevInteresado => [...prevInteresado, nuevoInteresado]);

    })


      //check owner
      
      if (user.id == data.owner.charAt(data.owner.length - 1)) {
        setSoyOwner(true);
      }

      //interesado

      data.interesados.forEach(async (interesado) => {
        let id = interesado.charAt(interesado.length - 1);
        if (user.id == id) {
          setSoyInteresado(true); 
        }
      })

    }
    } catch (e) {
      console.log(e);
    }
  }

  const checkPiso = async () => {
    if (user) {
      //check tengo piso
      let respuestaUser = await fetch(urlUser, {
        headers: {
          'Accept': 'application/json',
        },
      });
      
      let dataUser = await respuestaUser.json();

      if (dataUser.piso) {
        setSoyMiembro(true);
      }
  }
}

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const removeMyself = async () => {
    try {
      const url = `/piso/${piso.id}/removeMyself`;
      let respuesta = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        },
      });
      
      let data = await respuesta.json();

      setSoyInteresado(false);

      
    } catch (e) {
      console.log(e);
    }
  }

  const addMyself = async () => {
    try {
      const url = `/piso/${piso.id}/addMyself`;
      let respuesta = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        },
      });
      
      let data = await respuesta.json();

      

      setSoyInteresado(true);
      
    } catch (e) {
      console.log(e);
    }
  }

  const removeInteresado = async (id) => {
    try {
      const url = `/piso/${piso.id}/removeInteresado/${id}`;
      let respuesta = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        },
      });
      
      let data = await respuesta.json();

      console.log(data);

      setInteresados((interesados) => interesados.filter(interesado => interesado.id != id ));


      
    } catch (e) {
      console.log(e);
    }
  }

  const addMiembro = async (id) => {
    try {
      const url = `/piso/${piso.id}/addMiembro/${id}`;
      let respuesta = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        },
      });

      let data = await respuesta.json();

      if (miembros.length < piso.plazas) {
        if (respuesta.status === 200) {
          $('.addMiembro').show();
          $('.removeMiembro').hide();
        }
        
        setMiembros(prevMiembro => [...prevMiembro, data]);
  
        setInteresados((interesados) => interesados.filter(interesado => interesado.id != data.id ));
      }
      else {
        alert ("El piso ya esta lleno");
      }



    } catch (e) {
      console.log(e);
    }
  }

  const removeMiembro = async (id) => {
    try {
      const url = `/piso/${piso.id}/removeMiembro/${id}`;
      let respuesta = await fetch(url, {
        headers: {
          'Accept': 'application/json',
        },
      });
      
      let data = await respuesta.json();

      if (respuesta.status === 200) {
        $('.removeMiembro').show();
        $('.addMiembro').hide();
      }

      setMiembros((miembros) => miembros.filter(miembro => miembro.id != id ));

      setSoyMiembro(false);
      
    } catch (e) {
      console.log(e);
    }
  }
  
  const handleVolver = () => {
    navigate(-1);
  }

  useEffect(() => {
    getInfoPiso();
    checkPiso();

  }, [])


  return (
    <div className="piso-container">
    
      <div className="piso-header">

        <Carousel activeIndex={index} onSelect={handleSelect} dynamicHeight="True" width="100%">
          {imagenes.map((imagen) =>(
              <div className="piso-imagen">
                <img src={imagen} />
              </div>

          ))}

        </Carousel>
          <div className="piso-header-container">
            <div className="piso-titulo">
            <h2>{piso.titulo}</h2>
            <p>Ciudad: &nbsp;
            <Link to={'/pisos/' + piso.ciudad} key={piso.id}>
              {piso.ciudad}
            </Link>
            </p>
            <p>Plazas ocupadas: {miembros.length} / {piso.plazas}</p>
            
            <p>Estado: &nbsp;
            {piso.estado === 'Disponible' ? 
            <span className="disponible">Disponible</span> :
            <span className="ocupado">Ocupado</span>}
            </p>
            {piso.estado == "Disponible" ?
            piso.fechaDisponible ? 
            <p>Próxima disponibilidad: {piso.fechaDisponible}</p>:
            <p>Próxima disponibilidad: Sin fecha</p>
            : null}

            {userGlobal ? 
            soyOwner ? <button className="btn btn-secondary noInteresado" disabled>Eres el dueño</button> :
            soyInteresado ? <button className="btn btn-danger noInteresado" onClick={removeMyself}>Ya no estoy interesado</button>
            : soyMiembro ? <button className="btn btn-secondary noInteresado" disabled>Ya eres miembro de un piso</button> 
            : <button onClick={addMyself} class="btn btn-primary interesado" role="button">Estoy interesado</button>
            : <button className="btn btn-secondary noInteresado" disabled>No estás logeado</button> }

            </div>
            
            {soyOwner || soyAdmin ?
            <div className="piso-control">
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  Opciones
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li><Link to = {"editar"} className="dropdown-item">Editar piso</Link></li>
                  <li><hr class="dropdown-divider"/></li>
                  <li><a class="dropdown-item" href={urlRemovePiso}>Borrar piso</a></li>
                </ul>
              </div>

            </div>
            : null }
            {miembros.length ?
            <div className="piso-miembros">
                <h2>Miembros</h2>
                <ul>
                <div className="piso-listaMiembros">
                  {miembros.map((miembro) => 
                    <li><Link to={'/user/' + miembro.id.toString()}><i class="bi bi-person"></i>{miembro.nombre} {miembro.apellidos}</Link>
                    {userGlobal ?
                    soyOwner || miembro.id == user.id ? <div className="miembros-buttons">
                      <button className="btn btn-danger" onClick={()=>removeMiembro(miembro.id)}><i class='bi bi-x'></i></button>
                      </div> :
                      null: null}
                    </li>
                    
                  )}
                </div>
                </ul>
            
            </div> : <h2>No hay miembros</h2> }
          </div>
      </div>

      <div className="piso-content">
        <div className="piso-descripcion">
          <h3>Descripción del piso</h3>
          <p>{piso.descripcion}</p>
        </div>
        
        <div className="piso-descripcion">
          <h3>Dirección del piso</h3>
          <p>{piso.direccion}</p>
        </div>
         
        {soyOwner ?

        interesados.length ?
        <div className="piso-interesados">
                <h2>Interesados</h2>
                <ul>
                <div className="piso-listaInteresados">
                  
                  {interesados.map((interesado) => 
                    <li>
                    <Link to={'/user/' + interesado.id.toString()}><i class="bi bi-person"></i> {interesado.nombre} {interesado.apellidos}</Link>
                    {userGlobal ?
                    soyOwner ? 
                    interesado.piso == null ? <div className="interesados-buttons">
                      
                      <button className="btn-sm btn-success" onClick={()=>addMiembro(interesado.id)}><i class='bi bi-check'></i></button>
                      <button className="btn-sm btn-danger" onClick={()=>removeInteresado(interesado.id)}><i class='bi bi-x'></i></button>
                      </div> :

                      <div className="interesados-buttons">

                      <button className="btn-sm btn-danger" onClick={()=>removeInteresado(interesado.id)}><i class='bi bi-x'></i></button>
                      </div>
                       : null : null}
                    
                      </li>
                    
                  )}
          
                </div>
                </ul>
            </div> : <h2>No hay interesados</h2> : null }

      </div>
      <div className="volver">
          <button className="btn btn-primary" onClick={handleVolver}>Volver</button>
      </div>

      <div class="addMiembro alert alert-success " data-dismiss="alert" role="alert">
        Miembro añadido correctamente
      </div>
      <div class="removeMiembro alert alert-danger" data-dismiss="alert" role="alert">
        Miembro eliminado correctamente
      </div>    
    </div>


  )
}

export default Piso