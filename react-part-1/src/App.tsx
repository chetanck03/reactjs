
function App() {

  let posts = [{
    "name":"chetan",
    "message":"first message"
  },{
    "name":"gautam",
    "message":"second message"
  },{
    "name":"vikram",
    "message":"third message"
  }
];

setInterval(() => {

  console.log("running interval");
  

  posts.push({
    "name":"testing user",
    "message":"testing message"
  })

  console.log(posts);
  
  
}, 1000);

  return (
    <>
    <div> hello world!</div>
    <Post name="rahul" message="hi"/>
    <Post name="raja" message="hello man!"/>

    {posts.map(p => <LinkedinPost name={p.name} message={p.message}/>)}


    </>
   
  )
}

function Post(props) {
  return (
    <div style={{margin:20 , padding:20 , background:"red"}}>

      <div>{props.name}</div>
      <div>{props.message}</div>


    </div>
  )
}

function LinkedinPost(props) {
  return (
    <div style={{margin:20 , padding:20 , background:"yellow"}}>

      <div>{props.name}</div>
      <div>{props.message}</div>


    </div>
  )
}

export default App
