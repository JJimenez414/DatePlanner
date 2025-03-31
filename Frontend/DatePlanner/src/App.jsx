import './App.css'
import { socket } from './socket.js';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Landingpage from './components/Landingpage.jsx';
import Createroom from './components/Createroom.jsx';
import Joinroom from './components/Joinroom.jsx';
import Room from './components/Room.jsx';
import Activitylist from './components/Activitylist.jsx';
import SubmitionsWait from './components/SubmitionsWait.jsx';

function App() {

  useEffect(()=>{
    socket.on("connect", () => {
        console.log("Connecting to server")
    })

    return () => {
      socket.off("connect");
    }
  }, [])

  return (
    <Routes>

      <Route path="/" element={<Landingpage/>}/>
      <Route path="/createroom" element={<Createroom/>}/>  
      <Route path="/joinroom" element={<Joinroom/>}/>  
      <Route path="/activitylist" element={<Activitylist/>}/>
      <Route path="/submitionswait" element={<SubmitionsWait/>}/>
      <Route path="/room" element={<Room/>}/>


    </Routes>
  )

}

export default App