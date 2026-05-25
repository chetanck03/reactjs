import { useState, useEffect } from "react";
import axios from "axios";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

function App() {
  const [data, setData] = useState<Todo[]>([]);

  const[todo, setTodo]=useState(1);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos/')
      .then(response => {
        setData(response.data);
      });
  }, []);

  return (
    <>
      <div>
        Hello World!

        <div style={{padding:20,margin:20,background:"red"}}>
          hey 

          <button onClick={()=>setTodo(1)}>1</button>
          <button onClick={()=>setTodo(2)}>2</button>
          <button onClick={()=>setTodo(3)}>3</button>

          <Todo id={todo}/>

        </div>

        <div style={{padding:20 , margin:20 ,backgroundColor:"yellow"}}>
          {data.map(d => <p key={d.id}>{d.id}: {d.title} : {d.completed ? "true" : "false"}</p>)}
        </div>
      
      </div>
    </>
  );
}

function Todo(props:any){
  const [title,setTitle] = useState("")

  const id = props.id

  console.log(id);

  useEffect(()=>{

    axios.get('https://jsonplaceholder.typicode.com/todos/'+id)
    .then(r=>{
      setTitle(r.data.title)
    })

   let intervalClock = setInterval(()=>{
      console.log("Pls wait for sec"+id );
    },id*1000)

    return () =>{
      clearInterval(intervalClock)
    }

  },[id])
  
  return(
    <>
   {title}
    </>

  )
}

export default App;