import './todo.css';
import { useState } from 'react';
import {base_url} from '../../src/Constants'
import jwt from 'jwt-decode';
const Todo = (props)=>{
  const [isEdit, setIsEdit]=useState(false)
  const [editValue,setEditValue]=useState("")
  let token = ""

  const removeItem = async(e)=>{
    token = localStorage.getItem("token")
    const decoded = jwt(token);
    const id = decoded.user_id;
    let res = await fetch(`${base_url}/lists/${e.target.parentNode.id}?user_id=${id}`,{
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    if (res.status == 401){
      props.fetchData();
      return
    }
    alert("Item deleted sucessfully")
    props.fetchData();
  }

  const editItem = async(e)=>{
    let data = {
      todo:{
        description: editValue,
        completed : false}
    }
    token = localStorage.getItem("token")
    const decoded = jwt(token);
    const id = decoded.user_id;
    setIsEdit(false)
 
    const res = await fetch(`${base_url}/lists/${e.target.parentNode.id}?user_id=${id}`,{
      method: 'PUT',
      headers:{
        'Accept':'Application/json',
        'Content-type' : 'Application/json',
        "authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (res.status == 401){
      props.fetchData();
      return
    }
    alert("Item Edited sucessfully")
    props.fetchData();
  }
  
    return (
      <div className="todo">
        <div className='item'>
          <h3 className='margin'>{props.id+1}.</h3>
          {isEdit?
            <input className= "input-box" autoFocus value={editValue} onKeyDown={(e)=>{
              if (e.key === 'Escape') {
                setIsEdit(false)
              }
            }}
            onChange={(e)=>{
              setEditValue(e.currentTarget.value)
            }}></input>
            :<p className='margin'>{props.item.description}</p>}
        </div>


        <div className='delete-todo' id={props.deleteId}>
          {isEdit?
            <button className='add-button' onClick={editItem}>Save</button>
            :<button className='add-button' onClick={(e)=>{
              setIsEdit(true)
              setEditValue(props.item.description)
            }}>Edit</button>}

          {isEdit?"":<button className='add-button' onClick={removeItem}>Done</button>}
        </div>
      </div>
     
    );
  }
  export default Todo;