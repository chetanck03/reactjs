import { useState } from "react";
import Input from "./input/Input";

export default function RightSide() {

const [hovered, setHovered] = useState(null);

  return (
    <>
    <div style={{minHeight:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>

        <div style={{textAlign:"center",fontSize:"20px",}}>
                    <div>
                        <h2>Login to Neon</h2>
                        <div style={{color:"#c4c4c4",fontSize:"16px",margin:"10px"}}>
                          Connect to Neon with: 
                        </div>
                    </div>

                    <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "20px",
                        maxWidth: "700px",
                        margin: "auto",
                    }}
                    >
                    {["Google", "Github", "Microsoft", "Facebook"].map((item) => (
                         <button
                        key={item}
                        onMouseEnter={() => setHovered(item)}
                        onMouseLeave={() => setHovered(null)}
                        style={{
                            background: hovered === item ? "#6F4E37" : "#000",
                            color: "#fff",
                            border: hovered === item ? "1px solid #8B5E3C" : "1px solid #444",
                            borderRadius: "10px",
                            padding: "10px 24px",
                            fontSize: "18px",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                        }}
                        >
                        {item}
                        </button>
                    ))}
                    </div>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "20px",
                            width: "100%",
                            color: "#b3b3b3",
                            fontSize: "14px",
                            margin: "20px 0",
                        }}
                        >
                        <span
                            style={{
                            flex: 1,
                            height: "1px",
                            backgroundColor: "#444",
                            }}
                        />
                        
                        <span>Or continue with</span>

                        <span
                            style={{
                            flex: 1,
                            height: "1px",
                            backgroundColor: "#444",
                            }}
                        />
                    </div>

                    <div >

                        <div>
                          <Input type="text" placeholder="email"  />
                        </div>

                        <div>
                        <input type="text" placeholder="password" style={{padding:"10px", margin:"4px",width:"250px", background:"black",color:"white",border:"1px solid white",borderRadius:"10px"}}/>
                        </div>

                        <button 
                         style={{
                            background: "#000",
                            color: "#fff",
                            border: "1px solid #444",
                            borderRadius: "10px",
                            padding: "10px ",
                            margin:"10px",
                            fontSize: "18px",
                            cursor: "pointer",
                            width:"100px"
                        }}
                        >Login</button>
                      
                       
                    </div>

          

                    <div>

            </div>

         </div>

       

         


    </div>
    </>
  )
}
