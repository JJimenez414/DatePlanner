import React, { useEffect, useState } from 'react'
import { socket, getConnectionStatus } from '../socket'
import { useNavigate } from 'react-router-dom';
import { useRoom } from '../context/RoomContext';

function Room() {
    const [activities, setActivities] = useState([]);
    const [connectionStatus, setConnectionStatus] = useState(getConnectionStatus());
    const navigate = useNavigate();
    const { roomID, setRoomID } = useRoom();

    useEffect(() => {

        if (!roomID) {
            navigate('/');
            return;
        }

        // Update connection status
        const updateStatus = () => setConnectionStatus(getConnectionStatus());
        socket.on('connect', updateStatus);
        socket.on('disconnect', updateStatus);

        // Receive activities
        socket.on("receive-activities", (data) => {
            setActivities((prev) => [data]);
            console.log(data);
        });

        // Cleanup function
        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('receive-activities');

        }
    }, [roomID, navigate]);

    return(
      <>
        <div className='room-container center'>
          {activities.map((activity, index) => (

                <p key={index}> {activity} </p>

          ))}
        </div>
      </>
    )
    
}

export default Room