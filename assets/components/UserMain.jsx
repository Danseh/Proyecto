import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';
import Aside from './Aside';


const UserMain = ({userGlobal,setUserGlobal}) => {
  
  return (
    <section className="content">
      <Aside userGlobal={userGlobal} setUserGlobal={setUserGlobal} />
      <section className="main">
        <Outlet />
      </section>
      {/* <Libros userGlobal={userGlobal}/> */}
    </section>
  )
}

export default UserMain