import { BrowserRouter,Routes,Route } from "react-router"
import Auth from "./components/Auth"
import Dashboard from "./components/Dashboard"
import Board from "./components/Board"

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Auth/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/board/:boardid" element={<Board/>}/>
      </Routes>
    </BrowserRouter>
    </>
   
  )
}

export default App