import React from 'react'

const NavBar = ({showloginhandler,showregisterhandler, showLogOut, LogOutHandler}) => {
  console.log(showloginhandler)
  return (
    <div className="navsection">
      <div className="company">
      Vendor Dashboard
      </div>
      <div className="UserAuth">
      { !showLogOut ? 
        <><span onClick={showloginhandler}>Login /</span>
        <span onClick={showregisterhandler}> Register</span>
        </> : <span onClick={LogOutHandler}> Logout </span>
      }
      </div>
    </div>  
  )
}

export default NavBar
