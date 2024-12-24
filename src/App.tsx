import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./Home.tsx";
import About from "./About.tsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="*" element={<Navigate to="/" replace/>}/> // 찾을 수 없는 URL인 경우 Home 으로 이동
    </Routes>
  )
}