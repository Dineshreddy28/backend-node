import React,{useState, useEffect} from 'react'
import NavBar from '../NavBar'
import SideBar from '../SideBar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import Addfirm from '../components/forms/Addfirm'
import Addproduct from '../components/forms/Addproduct'
import Allproducts from '../Allproducts'

const Landingpages = () => {
  const [showLogin, setshowlogin]=useState(false)
  const [showRegister, setshowregister]=useState(false)
  const [showfirm, setshowfirm]=useState(false)
  const [showproduct, setshowproduct]=useState(false)
  const [showAllproduct, setAllproduct]=useState(false)
  const [showLogOut, setshowLogOut]=useState(false)

  useEffect(()=>{
    const LoginToken= localStorage.getItem('loginToken');
    if(LoginToken){
      setshowLogOut(true)
    }
  },[])

  const LogOutHandler=()=>{
    confirm("Are you sure, you want to logout?")
    localStorage.removeItem('loginToken')
    localStorage.removeItem('firmId')
    setshowLogOut(false)
  }

const showloginhandler=()=>{
  setshowlogin(true)
  setshowregister(false)
  setshowfirm(false)
  setshowproduct(false)
  setAllproduct(false)
}
const showregisterhandler=()=>{
  setshowregister(true)
  setshowlogin(false)
  setshowfirm(false)
  setshowproduct(false)
  setAllproduct(false)
}
const showfirmhandler=()=>{
  setshowfirm(true)
  setshowlogin(false)
  setshowregister(false)
  setshowproduct(false)
  setAllproduct(false)
}
const showproducthandler=()=>{
  setshowproduct(true)
  setshowlogin(false)
  setshowregister(false)
  setshowfirm(false)
  setAllproduct(false)
}
const showAllproducthandler=()=>{
  setshowproduct(false)
  setshowlogin(false)
  setshowregister(false)
  setshowfirm(false)
  setAllproduct(true)
}




  return (
    <>
      <section className='landingsection'>
      <NavBar showloginhandler={showloginhandler} showregisterhandler={showregisterhandler} showLogOut={showLogOut} LogOutHandler={LogOutHandler}/>
        <div className="collectionsection">
          <SideBar showfirmhandler={showfirmhandler} showproducthandler={showproducthandler} showAllproducthandler={showAllproducthandler}/>
          {showLogin && showLogOut && <Login showfirmhandler={showfirmhandler}/>}
          {showRegister && <Register showloginhandler={showloginhandler}/>}
          {showfirm &&showLogOut&& <Addfirm showproducthandler={showproducthandler}/>}
          {showproduct &&showLogOut&& <Addproduct />}
          {showAllproduct && <Allproducts showAllproducthandler={showAllproducthandler}/>}
          
        </div>
      </section>
    </>
  )
}

export default Landingpages
