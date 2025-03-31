import React, { useEffect, useState} from 'react';
import {Link } from 'react-router-dom';
import { socket }from '../socket';
import { useRoom } from '../context/RoomContext';

function SubmitionsWait() {
    const [numSubmitions, setNumSubmitions] = useState(0);
    const [numUsers, setNumUsers] = useState(0);
    const { roomID } = useRoom();
    const [isHost, setIsHost] = useState(false);

    useEffect(() => {

        socket.emit('wait-room', roomID); // tell the server that the user is on the waiting room.

        socket.on('wait-room', (payload) => { // receit information about the wait room.
            setNumSubmitions(payload.numSubmitions);
            setNumUsers(payload.numUsers);  

            if(!isHost) { // if we found our host, stop updating host
                setIsHost(payload.isHost);
            }
        })

        return () => {
            socket.off('wait-room');
        }
    }, [isHost])

  return (
    <> 
        <div className=''>

            <p> connected: {numSubmitions}</p>
            <p> users: {numUsers}</p>
            <p> users: {isHost ? "host" : "not host"}</p>

        </div>
        
    </>

  )
}

export default SubmitionsWait