import { useState,useEffect } from 'react';
import Todolist from './Todolist';
import './form.css';
const SubmitForm = ()=>{
    const [userInput, setUserInput] = useState('');
    const [todoList, setTodoList] = useState([]);

    const fetchData = () => {
      return fetch(
        "http://127.0.0.1:3000?page=0&per_page=17")
        .then((res) => res.json())
        .then((json) => {
          setTodoList(json.list)
        })
    }

    useEffect(() => {
      fetchData();
    },[])

    
    const handlesubmit=(e)=>{
      if (userInput === "") {
        alert("No Input");
        return;
      }
      e.preventDefault();

      let data = {
        todo:{
          description: userInput,
          completed : false}
      }
      
      fetch('http://127.0.0.1:3000/lists', { 
      method: 'POST',
      headers:{
        'Accept':'Application/json',
        'Content-type' : 'Application/json'
      },
      mode: 'cors', 
      body: JSON.stringify(data),
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