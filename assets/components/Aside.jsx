import React from 'react'
import { Link } from 'react-router-dom';
import Login from './Login';
import Panel from './Panel';

const myStorage2 = window.localStorage;

const Aside = ({userGlobal,setUserGlobal}) => {

  return (
    <aside>
      {userGlobal ? <Panel userGlobal={userGlobal} setUserGlobal={setUserGlobal}/> : <Login setUserGlobal={setUserGlobal}/>}
    </aside>
  )
}

export default Aside