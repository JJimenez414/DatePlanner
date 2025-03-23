import React, {useState} from 'react'
import { socket } from '../socket.js';
import { Link } from 'react-router-dom';


function Joinroom() {

  const [roomID, handleRoomID] = useState("");

  function joinRoom() {
      console.log(`joining ${roomID}`);
      socket.emit("join-room", roomID);
      socket.emit("send-message", roomID);
  }

  function handleInputChange(e) {
    handleRoomID(e.target.value);
  }

  return (
    <>

      <div className='join-room-container center'> 
        
        <input type="text" placeholder="ID Room" onChange={handleInputChange} value={roomID} />
        
        <Link to={"/room"}>
          <button className="btn" onClick={() => joinRoom()}> Join room </button>
        </Link>

      </div>

    </>
  )
}

export default Joinroom