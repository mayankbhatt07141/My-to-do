import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { base_url } from "../Constants";
const Signup = ()=>{
    let navigate= useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPass,setComfirmPass] = useState("");
    const handleSignup = async(e)=>{
        if (confirmPass!=password){
            return alert ("password does not match")
        }
        const data = {
            "email": email,
            "password":password
        }
        e.preventDefault();
        try {
            const res = await fetch(`${base_url}/users`, {
                method: "POST",
                headers: {
                  'Accept':'Application/json',
                  'Content-type' : 'Application/json'
                },
                body: JSON.stringify(data)
              });
              const response = await res.json();
              if(response.error){
                alert("Email is already registerd")
              }
              else{
                const token = response.token
                const decoded = jwt_decode(token)
                localStorage.setItem("token", response.token);
                localStorage.setItem("expires_at", decoded.exp);
                localStorage.setItem('user_id', decoded.user_id);
                localStorage.setItem('email', response.user.email)
                return navigate('/')
              }
        }catch (err) {
            console.error(err.message);
        }
    }
    return (
        <div className="outer">
            
            <div className="login-container">
            <div className="heading-div"><h1>Signup</h1></div>
            <div className="input-boxes">
                <input className="input-box-css" placeholder="Email" onChange={(e)=>{
                    setEmail(e.target.value)
                }}></input>
                <input className="input-box-css" placeholder="Password" type="password" onChange={(e)=>{
                    setPassword(e.target.value)
                }}></input>
                <input className="input-box-css" placeholder="Confirm Password" type="password" onChange={(e)=>{
                    setComfirmPass(e.target.value)
                }}></input>
                <button className="button-login" onClick={handleSignup}>Signup</button>
                <div className="signup-link">Already have account <Link to='/login'>click here</Link> to login</div>
            </div>
            </div>
        </div>
    )
};
export default Signup;