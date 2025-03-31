import React, { useEffect, useState} from 'react';
import {Link } from 'react-router-dom';
import { socket }from '../socket';
import { useRoom } from '../context/RoomContext';

function SubmitionsWait() {
    const [numSubmitions, setNumSubmitions] = useState(0);
    const [numUsers, setNumUsers] = useState(0);
    const { roomID } = useRoom();
    const [isDone, setIsDone] = useState(false);
    const [isHost, setIsHost] = useState(false);

    useEffect(() => {

        socket.emit('wait-room', roomID); // tell the server that the user is on the waiting room.

        socket.on('wait-room', (payload) => { // receit information about the wait room.
            setNumSubmitions(payload.numSubmitions);
            setNumUsers(payload.numUsers);  

            if(!isHost) { // if we found our host, stop updating host
                setIsHost(payload.isHost);
            }

            if(payload.numSubmitions === payload.numUsers) {
                setIsDone(true);
            }
        })



        return () => {
            socket.off('wait-room');
        }
    }, [isHost])

  return (
    <> 
        <div className='center wait-room-container'>
            <div className=''>
                <div className= {isDone ? 'wait-room-info-container-border-done' : 'wait-room-info-container-border'}></div>
                <div className='wait-room-info-container'> 
                        <p> connected: {numSubmitions}</p>
                        <p> users: {numUsers}</p>
                        <p> users: {isHost ? "host" : "not host"}</p>
                </div>
            </div>
        </div>
        
    </>

  )
}

export default SubmitionsWait