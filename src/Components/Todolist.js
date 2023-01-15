import Todo from "./Todo";
import './todoList.css';
const Todolist = (props)=>{
  console.log(props)
  return (
    <div className="todo-continer">
    <div className='todo-list'>
      {
      props.todoList && props.todoList.map((item,i)=>{
        console.log(item)
        return(
          <Todo key={i} item={item} id={i} deleteId={item.id} fetchData={props.fetchData}/>
        )
      })}
    </div>
    </div>
  )
}

export default Todolist;