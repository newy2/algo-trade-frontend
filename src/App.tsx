import {Route, Routes} from "react-router-dom";
import Home from "./Home.tsx";
import About from "./About.tsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} index={true}/>
      <Route path="/about" element={<About/>}/>
    </Routes>
  )
}