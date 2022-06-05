import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Pisos from './Pisos';
import Crearpiso from './Crearpiso';
import User from './User';
import UserEdit from './UserEdit';
import Piso from './Piso';
import PisosCiudad from './PisosCiudad';


const myStorage = window.sessionStorage;

const Rutas = () => {

    const [userGlobal, setUserGlobal] = useState(false);
    

    async function clearStorage () {

        let session = myStorage.getItem('loggedUser');
    
        if (session == null) {

            myStorage.removeItem('loggedUser');
            try {
            const url = `/api/login`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                  },
              });
              //console.log(response);
              const data = await response.json();
              console.log(data);

              if (data.id) {
                setUserGlobal(data);
              }
            }
            catch (e) {
            console.log(e);
            }
        }
        else {
            setUserGlobal(JSON.parse(myStorage.getItem('loggedUser')));
        }

    }

    window.addEventListener('load', clearStorage);

    useEffect(() => {
        if (typeof myStorage.getItem('loggedUser') === "string") {
            //console.log("storage es string?? - siempre es string");
            //console.log(myStorage.getItem('bibliotecaLoggedUser'));
            setUserGlobal(JSON.parse(myStorage.getItem('loggedUser')));
        } 
    }, [])

    useEffect(() => {

        console.log(userGlobal);
        if (myStorage.getItem('loggedUser') === null) {
            
            if (userGlobal) {
                
                myStorage.setItem('loggedUser', JSON.stringify(userGlobal));
            }
        } 
    }, [userGlobal])
    


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout userGlobal={userGlobal} setUserGlobal={setUserGlobal}/>}>
                    <Route index element={<Pisos />} />
                    <Route path="crearpiso" element={<Crearpiso userGlobal={userGlobal} />} />
                    <Route path="user/:id" element={<User userGlobal={userGlobal} />} />
                    <Route path="user/:id/editar" element={<UserEdit userGlobal={userGlobal} setUserGlobal={setUserGlobal} />} />
                    <Route path="piso/:id" element={<Piso userGlobal={userGlobal} />} />
                    <Route path="pisos/:ciudad" element={<PisosCiudad />} />

                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Rutas