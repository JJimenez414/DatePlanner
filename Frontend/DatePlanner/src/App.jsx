import './App.css'
import React, { useEffect } from 'react';
import Landingpage from './components/landingpage.jsx';
import { socket } from './socket';

function App() {
     
  // useEffect(()=> {

  //     socket.on("connect", () => {
  //       console.log(`Connecting to server as ${socket.id}`);
  //     });

  //     socket.on('receive-message', (value) => {
  //       console.log(`receive message ${value}`)
  //     })

  //     return () => {
  //       socket.off('receive-message');
  //     }

  //   }, []);

  // function test(e) {
  //   let data = e.target.innerHTML;

  //   console.log("emitting message to server");
  //   socket.emit("send-message", data);
  // }

  return (
    <>
      <Landingpage/>

    </>
  )

}

export default App