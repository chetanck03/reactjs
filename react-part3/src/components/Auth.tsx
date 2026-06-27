import LeftSide from "./screens/auth-screens/LeftSide"
import RightSide from "./screens/auth-screens/RightSide"

function Auth() {
  return (
    <div style={{display:"flex"}}>
      <div style={{flex:4,background:"black"}}>
        <LeftSide/>
      </div>
      <div style={{border:"0.5px solid #252525"}}/>

      <div style={{flex:6,background:"#000000",color:"white"}}>
         <RightSide/>
      </div>
      
    </div>
  )
}

export default Auth