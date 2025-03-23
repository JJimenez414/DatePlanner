import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid';
import { socket } from '../socket.js';

function Createroom() {

    const[roomID, setroomID] = useState(uuidv4()); // create a unique id for a room

    function newRoom() { // when called we create a new room id (new room)
        setroomID(uuidv4)
    }

    function joinRoom() { 
        console.log(`joining ${roomID}`);
        socket.emit("join-room", roomID); // when we click 'Connect' we connect to a rum via join-room
    }

    useEffect(()=>{

        socket.on('receive-message', (args) => { // we listen for any messages
            console.log(args);
        })

        return () => {
            socket.off('receive-message');
        };

    }, [])

    return (

    <>
        <div className='create-room-container center'> 
                <p> {roomID} </p>
                <button className="btn" onClick={() => newRoom()}> New Room </button> 

                <Link to={"/room"}> 
                    <button className="btn" onClick={() => joinRoom()}> Connnect </button> 
                </Link>
        </div>
    </>
    
  )
}

export default Createroom