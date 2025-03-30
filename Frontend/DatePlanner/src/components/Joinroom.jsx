import React, { useState } from 'react'
import { socket } from '../socket.js';
import { Link } from 'react-router-dom';
import { useRoom } from '../context/RoomContext';

function Joinroom() {
    const [roomID, setRoomID] = useState(""); // tracks the roomID input
    const { setRoomID: setGlobalRoomID } = useRoom();

    function joinRoom() { // joinning room if roomID is not empty and saving it to the global roomID
        if (!roomID.trim()) return;
        
        console.log(`joining ${roomID}`);
        setGlobalRoomID(roomID);
        socket.emit("join-room", roomID);
    }

    function handleInputChange(e) {// updating the roomID input
        setRoomID(e.target.value);
    }

    return (
        <>
            <div className='join-room-container center'> 
                <input 
                    type="text" 
                    placeholder="Enter Room ID" 
                    onChange={handleInputChange} 
                    value={roomID}
                    className="room-input"
                />
                
                <Link to={"/activitylist"} onClick={() => joinRoom}>
                    <button 
                        className="btn" 
                        disabled={!roomID.trim()}
                    > 
                        Join Room 
                    </button>
                </Link>
            </div>
        </>
    )
}

export default Joinroom