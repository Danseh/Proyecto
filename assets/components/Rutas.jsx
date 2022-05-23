import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Pisos from './Pisos';
import Crearpiso from './Crearpiso';
import User from './User';

const myStorage = window.localStorage;

const Rutas = () => {

    const [userGlobal, setUserGlobal] = useState(false);

    useEffect(() => {
        if (typeof myStorage.getItem('loggedUser') === "string") {
            //console.log("storage es string?? - siempre es string");
            //console.log(myStorage.getItem('bibliotecaLoggedUser'));
            setUserGlobal(JSON.parse(myStorage.getItem('loggedUser')));
        } 
    }, [])

    useEffect(() => {
        //console.log("effect userglobal");
        console.log(userGlobal);
        if (myStorage.getItem('loggedUser') === null) {
            //console.log("storage es null");
            if (userGlobal) {
                //console.log("entra");
                
                myStorage.setItem('loggedUser', JSON.stringify(userGlobal));
            }
        } 
    }, [userGlobal])
    


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout userGlobal={userGlobal} setUserGlobal={setUserGlobal}/>}>
                    <Route index element={<Pisos userGlobal={userGlobal} setUserGlobal={setUserGlobal}/>} />
                    <Route path="crearpiso" element={<Crearpiso userGlobal={userGlobal} />} />
                    <Route path="user/:id" element={<User userGlobal={userGlobal} />} />

                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Rutas