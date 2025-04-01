import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { socket }from '../socket';
import { useRoom } from '../context/RoomContext';
import { useNavigate } from 'react-router-dom';

function SubmitionsWait() {
    const [numSubmitions, setNumSubmitions] = useState(0);
    const [numUsers, setNumUsers] = useState(0);
    const { roomID } = useRoom();
    const [isDone, setIsDone] = useState(false);
    const [isHost, setIsHost] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        socket.emit('wait-room', roomID); // tell the server that the user is on the waiting room.

        socket.on('wait-room', (payload) => { // receit information about the wait room.
            setNumSubmitions(payload.numSubmitions);
            setNumUsers(payload.numUsers);  

            if(payload.numSubmitions === payload.numUsers) { // if the number of submistions is equal to the number of users, then everyone has submited
                setIsDone(true);
            }
        })

        socket.on('host', (host) =>  {
            if(!isHost) { // if we found our host, stop updating host
                setIsHost(host);
            }
            console.log("im host");
        })

        socket.on("receive-continue", () => { // navigate to the room page
            navigate('/room');
        })




        return () => {
            socket.off('wait-room');
            socket.off('receive-continue');
            socket.off('host');
        }
    }, [])

    function handleContinue() { // send a continue signal to the server, made only by the host.
        socket.emit("continue", roomID);
    }

  return (
    <> 
        <div className='center wait-room-container'>
            <div className=''>
                <div className= {isDone ? 'wait-room-info-container-border-done' : 'wait-room-info-container-border'}></div>
                <div className='wait-room-info-container'> 
                        <p> Submitions: {numSubmitions}</p>
                        <p> Users on room: {numUsers}</p>
                        <p> {isHost ? "host" : "not host"}</p>
                        <button onClick={handleContinue} className={isHost ? "wait-room-btn" : "wait-room-btn-hidden"}> continue </button>

                </div>
            </div>
        </div>
        
    </>

  )
}

export default SubmitionsWait