import React, { useEffect, useState } from 'react'
import Header from './Header';

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