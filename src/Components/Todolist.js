import Todo from "./Todo";
import './todoList.css';
const Todolist = (props)=>{
  return (
    <div className="todo-continer">
    <div className='todo-list'>
      {props.todoList && props.todoList.map((item,i)=>{
        return(
          <div className="todo-container">
          <Todo key={i} item={item} id={i} deleteId={item.id} fetchData={props.fetchData}/>
          </div>
        )
      })}
    </div>
    </div>
  )
}

export default Todolist;