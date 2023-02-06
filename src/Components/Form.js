import { useState,useEffect } from 'react';
import Todolist from './Todolist';
import jwt from 'jwt-decode';
import {base_url} from '../../src/Constants'
import './form.css';
import { useNavigate } from 'react-router-dom';

const SubmitForm = ()=>{
    const navigate = useNavigate();
    const [userInput, setUserInput] = useState('');
    const [todoList, setTodoList] = useState([]);
    let token = ""


    const fetchData = () => {
      // it will work without settime out but to be for safe side, as Localhost.setItem() is asyncronous and takes some time and getItem is syncronous. 
      
        const currentTime = Math.floor(Date.now() / 1000);
        let expTime = localStorage.getItem('expires_at')
        if(expTime < currentTime){
          localStorage.removeItem('token')
          localStorage.removeItem('expires_at')
          localStorage.removeItem('user_id')
          localStorage.removeItem('email')
          alert ("session expired please login again")
          return navigate('/login')
        }
        token = localStorage.getItem("token")
        let id = localStorage.getItem("user_id")
        
        return fetch(`${base_url}?page=0&per_page=10&user_id=${id}`,
        {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
          .then((res) => res.json())
          .then((json) => {
            setTodoList(json.list)
          })
    }
    
    // const verifyToken=()=>{
     
    // }
    useEffect(() => {
      fetchData();
    },[])

    
    const handlesubmit=(e)=>{
      token = localStorage.getItem("token")
      const decoded = jwt(token);
      const id = decoded.user_id;
      if (userInput === "") {
        alert("No Input");
        return;
      }
      e.preventDefault();

      let data = {
        todo:{
          description: userInput,
          completed : false
        }
      }
      
      fetch(`${base_url}/lists?user_id=${id}`, { 
        method: 'POST',
        headers:{
          'Accept':'Application/json',
          'Content-type' : 'Application/json',
          "Authorization": `Bearer ${token}`
        },
        mode: 'cors', 
        body: JSON.stringify(data)
      })

      fetchData()
      setUserInput("")
      document.getElementsByClassName("input-box")[0].value = ""
    }


    return (
      <div className="wrapper">
        <div className='add-todo'>
          <form className='form'>
            <input className= "input-box" autoFocus placeholder="Add Task"
            onChange={(e)=>{
              setUserInput(e.currentTarget.value);
            }}></input>
            <button className= "add-button" type='submit' onClick={handlesubmit}>Add</button>
          </form>
          <div className='todo-list-container'><Todolist todoList={todoList} fetchData={fetchData}/></div>
        </div>
      </div>
    );
  }

  export default SubmitForm;