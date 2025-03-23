import './App.css'
import { socket } from './socket.js';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Landingpage from './components/Landingpage.jsx';
import Createroom from './components/Createroom.jsx';
import Joinroom from './components/Joinroom.jsx';

function App() {

  useEffect(()=>{
    socket.on("connect", () => {
        console.log("Connecting to server")
    })
  }, [])

  return (
    <Routes>

      <Route path="/" element={<Landingpage/>}/>
      <Route path="/createroom" element={<Createroom/>}/>  
      <Route path="/joinroom" element={<Joinroom/>}/>  

    </Routes>
  )

}

export default App