import React, { useState } from 'react'
import { socket } from '../socket.js';
import { Link } from 'react-router-dom';
import { useRoom } from '../context/RoomContext';

function Joinroom() {
    const [roomID, setRoomID] = useState("");
    const { setRoomID: setGlobalRoomID } = useRoom();

    function joinRoom() {
        if (!roomID.trim()) return;
        
        console.log(`joining ${roomID}`);
        setGlobalRoomID(roomID);
        socket.emit("join-room", roomID);
    }

    function handleInputChange(e) {
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
                
                <Link to={"/activitylist"}>
                    <button 
                        className="btn" 
                        onClick={joinRoom}
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