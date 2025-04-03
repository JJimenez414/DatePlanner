import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import { socket } from '../socket.js';
import { useRoom } from '../context/RoomContext.jsx';
import Copy from '../components/Copy.jsx'

function Createroom() {
    const [roomID, setroomID] = useState(uuidv4()); // set unique id for room
    const { setRoomID: setGlobalRoomID } = useRoom(); // set global roomID

    function newRoom() { // create new room by generating a new unique id
        const newID = uuidv4();
        setroomID(newID);
        setGlobalRoomID(newID);
    }

    function joinRoom() { // setting the goblal ID to roomID and joining the room
        console.log(`joining ${roomID}`)
        setGlobalRoomID(roomID);
        socket.emit("join-room", roomID, true); // true means that user is the host
    }


    return (
        <>
            <div className='create-room-container center'> 

                <div className='create-room-id'> 
                    <p> {roomID} </p>

                    <Copy text={roomID}/> 
                </div>

                <button className="btn" onClick={() => newRoom()}> New Room </button> 

                <Link to={"/activitylist"} onClick={() => joinRoom()}> 
                    <button className="btn"> Join Room </button> 
                </Link>

            </div>
        </>
    )
}

export default Createroom;