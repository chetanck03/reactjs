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

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos/')
      .then(response => {
        setData(response.data);
      });
  }, []);

  // let [data, setData] = useState([
  //   {
  //     id:1,
  //     title:"hi there!",
  //     completed:true
  //   }
  // ]);

  // setTimeout(() => {

  //   if(Math.random()<0.75){
  //     setData([...data,{
  //     id:1,
  //     title:"Adding entry!",
  //     completed:false
  //     }])

  //   }else{
  //     setData([data[0]])
  //   }
    
  // }, 1000);

  return (
    <>
      <div>
        Hello World!

        <div style={{padding:20 , margin:20 ,backgroundColor:"yellow"}}>
          {data.map(d => <p key={d.id}>{d.id}: {d.title} : {d.completed ? "true" : "false"}</p>)}
        </div>
      
      </div>
    </>
  );
}

export default App;