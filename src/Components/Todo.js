import './todo.css';
import { useState } from 'react';
const Todo = (props)=>{
  const [isEdit, setIsEdit]=useState(false)
  const [editValue,setEditValue]=useState("")
  const removeItem = (e)=>{
    fetch("http://127.0.0.1:3000/lists/"+e.target.parentNode.id,{
      method: 'DELETE',
    })
    alert("Item deleted sucessfully")
    props.fetchData();
  }

  const editItem = (e)=>{
    let data = {
      todo:{
        description: editValue,
        completed : false}
    }
    setIsEdit(false)
    console.log(e.target.parentNode.id)
    fetch("http://127.0.0.1:3000/lists/"+e.target.parentNode.id,{
      method: 'PUT',
      headers:{
        'Accept':'Application/json',
        'Content-type' : 'Application/json'
      },
      body: JSON.stringify(data)
    })
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
            // onMouseLeave={() => {
            //   setIsEdit(false)
            // }}
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