import React from "react"
import './Login.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import {base_url} from '../../src/Constants'
const Login =()=>{
  let navigate = useNavigate()
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleLogin = async (e)=>{
      const data = {
        "email": email,
        "password":password
      }
      e.preventDefault();
      try {
        const res = await fetch(`${base_url}/login`, {
          method: "POST",
          headers: {
            'Accept':'Application/json',
            'Content-type' : 'Application/json'
          },
          body: JSON.stringify(data)
        });
        const response = await res.json();
        if(response.error){
          alert(response.error)
        }
        else{
          const token = response.token
          const decoded = jwt_decode(token)
          localStorage.setItem("token", response.token);
          localStorage.setItem("expires_at", decoded.exp);
          localStorage.setItem('user_id', decoded.user_id)
          localStorage.setItem('email',response.user.email)
          return navigate('/')
        }
        
        
      } catch (err) {
        console.error(err.message);
      }
    }

    return (
      <div className="outer"> 
       
        <div className="login-container">
          <h1>Login</h1>
          <div className="input-boxes">
            <input className="input-box-css" placeholder="Email" onChange={(e)=>{
              setEmail(e.target.value)
            }}></input>
            <input className="input-box-css" placeholder="Password" type="password" onChange={(e)=>{
              setPassword(e.target.value)
            }}></input>
            <button className="button-login" onClick={handleLogin}>Login</button>
            <div className="signup-link">don't have account yet <Link to= '/signup'>click here</Link> to signup</div>
          </div>
        </div>
      </div>
    )

        }
export default Login;