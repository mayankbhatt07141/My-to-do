import React, { useEffect, useState } from "react"
import "./Header.css"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const Header = ()=>{
  
  const [isLoggedin, setIsLoggedin ] = useState(false)
  let navigate = useNavigate();
  
  const handleLogout = ()=>{
      localStorage.removeItem('token')
      localStorage.removeItem('user_id')
      localStorage.removeItem('expires_at')
      localStorage.removeItem('email')
      navigate('/login')
  }

  const getToken= ()=>{
    const currentTime = Math.floor(Date.now() / 1000);
    let expTime = localStorage.getItem('expires_at')
    if (expTime > currentTime){
      setIsLoggedin(true)
    }
    else{
      setIsLoggedin(false)
    }
  }

  useEffect(()=>{
    getToken()
  },[handleLogout])  

    return( 
    <>
      <div className="header">
        <div><img src="https://cdn.dribbble.com/users/6569/screenshots/16482169/media/de475cb79969a810d45ba9b5d8cbf4a5.png?compress=1&resize=400x300"/>
          <h5 className="email-in-header">{isLoggedin? localStorage.getItem('email'):""}</h5>
        </div>
          <div className="header-links">
          <Link style={{textDecoration: 'none'}} to= "/">
            <li className="li-css">
                Home
            </li>
            </Link>
            <Link style={{textDecoration: 'none'}} to= "/about">
              <li className="li-css">
                About
            </li>
            </Link>
            
              { isLoggedin == true ?
                <Link to = "/login" style={{textDecoration: 'none'}}> <li className="li-css" onClick={handleLogout}>
                  Logout
                </li ></Link>:
              <li className="li-css">
                Login
            </li>}
          </div>
        </div>
    </>
    )
}

export default Header;