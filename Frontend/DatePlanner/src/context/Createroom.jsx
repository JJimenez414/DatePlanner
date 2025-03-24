import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import { socket } from '../socket.js';
import { useRoom } from './RoomContext.jsx';

function Createroom() {
    const [roomID, setroomID] = useState(uuidv4());
    const { setRoomID: setGlobalRoomID } = useRoom();

    function newRoom() {
        const newID = uuidv4();
        setroomID(newID);
    }

    function joinRoom() {
        console.log(`joining ${roomID}`);
        setGlobalRoomID(roomID);
        socket.emit("join-room", roomID);
    }

    useEffect(() => {
        socket.on('receive-message', (args) => {
            console.log(args);
    });

        return () => {
            socket.off('receive-message');
        };
    }, []);

    return (
        <>
            <div className='create-room-container center'> 
                <p> {roomID} </p>
                <button className="btn" onClick={() => newRoom()}> New Room </button> 

                <Link to={"/activitylist"}> 
                    <button className="btn" onClick={() => joinRoom()}> Connect </button> 
                </Link>
            </div>
        </>
    )
}

export default Createroom