import React from 'react'
import Login from './Login';
import Panel from './Panel';

const Aside = ({userGlobal,setUserGlobal}) => {

  return (
    <aside>
      {userGlobal ? <Panel userGlobal={userGlobal} setUserGlobal={setUserGlobal}/> : <Login setUserGlobal={setUserGlobal}/>}
    </aside>
  )
}

export default Aside