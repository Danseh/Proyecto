import React, { useEffect, useState } from 'react'
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import Aside from './Aside';
import UserMain from './UserMain';


const Layout = ({userGlobal, setUserGlobal}) => {

  return (
    <>
      <Header userGlobal={userGlobal} setUserGlobal={setUserGlobal} />
      <UserMain userGlobal={userGlobal} setUserGlobal={setUserGlobal} />

    </>
  )
}

export default Layout;