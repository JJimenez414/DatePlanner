import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import { socket } from '../socket.js';
import { useRoom } from '../context/RoomContext.jsx';

function Createroom() {
    const [roomID, setroomID] = useState(uuidv4());
    const { setRoomID: setGlobalRoomID } = useRoom();

    function newRoom() {
        const newID = uuidv4();
        setroomID(newID);
        setGlobalRoomID(newID);
    }

    function joinRoom() {
        console.log(`joining ${roomID}`)
        setGlobalRoomID(roomID);
        socket.emit("join-room", roomID);
    }

    useEffect(()=>{
        console.log("hello world")
        console.log(roomID)
    }, [])

    return (
        <>
            <div className='create-room-container center'> 
                <p> {roomID} </p>
                <button className="btn" onClick={() => newRoom()}> New Room </button> 

                <Link to={"/activitylist"} onClick={() => joinRoom()}> 
                    <button className="btn"> Join Room </button> 
                </Link>
            </div>
        </>
    )
}

export default Createroom;