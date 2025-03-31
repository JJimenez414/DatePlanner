import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { socket }from '../socket';
import { useRoom } from '../context/RoomContext';

function SubmitionsWait() {
    const [numSubmitions, setNumSubmitions] = useState(0);
    const [numUsers, setNumUsers] = useState(0);
    const { roomID } = useRoom();
    const [isDone, setIsDone] = useState(false);
    const [isHost, setIsHost] = useState(true);

    useEffect(() => {

        socket.emit('wait-room', roomID); // tell the server that the user is on the waiting room.

        socket.on('wait-room', (payload) => { // receit information about the wait room.
            setNumSubmitions(payload.numSubmitions);
            setNumUsers(payload.numUsers);  

            if(!isHost) { // if we found our host, stop updating host
                setIsHost(payload.isHost);
                console.log("isHost", isHost);
            }

            if(payload.numSubmitions === payload.numUsers) {
                setIsDone(true);
            }
        })




        return () => {
            socket.off('wait-room');
        }
    }, [])

  return (
    <> 
        <div className='center wait-room-container'>
            <div className=''>
                <div className= {isDone ? 'wait-room-info-container-border-done' : 'wait-room-info-container-border'}></div>
                <div className='wait-room-info-container'> 
                        <p> Submitions: {numSubmitions}</p>
                        <p> Users on room: {numUsers}</p>
                        <Link to={"/room"}>
                            <button className="wait-room-btn"> continue </button>
                        </Link>

                </div>
            </div>
        </div>
        
    </>

  )
}

export default SubmitionsWait