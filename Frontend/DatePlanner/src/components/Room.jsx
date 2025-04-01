import React, { useRef, useEffect, useState } from 'react'
import { socket, getConnectionStatus } from '../socket'
import { useNavigate } from 'react-router-dom';
import { useRoom } from '../context/RoomContext';
import ActivityCard from './ActivityCard';

function Room() {
    const [activities, setActivities] = useState([]);
    const [connectionStatus, setConnectionStatus] = useState(getConnectionStatus());
    const navigate = useNavigate();
    const { roomID, setRoomID } = useRoom();
    const [acceptedActivities, addAcceptedActivities] = useState([]);
    const isMounted = useRef(false);
    
    useEffect(() => {
      // returns to home if roomID is not set
      if (!roomID) {
            navigate('/');
            return;
        }
        // Update connection status
        const updateStatus = () => setConnectionStatus(getConnectionStatus());
        socket.on('connect', updateStatus);
        socket.on('disconnect', updateStatus);

        function addActivities(activities) {
          setActivities((prev) => [...prev, ...activities])
        }

        // Receive activities
        socket.emit("request-activities", roomID, addActivities);

        // Cleanup function
        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('receive-activities');

        }
    }, []);

    useEffect(()=> { 
      // checks if users has gone through all activities.
      if (isMounted.current) {
        if (activities.length === 0) {
          socket.emit("accepted-activities", acceptedActivities, roomID);
          navigate("/postwait");
        }
      } else {
        isMounted.current = true;
      }
    }, [activities]) // we aremove a specific card on the activity card page.

    return(
      <>
        <div className='room-container center'>
          <div className='room-card-container center'>
            <div className="activity-card-container">
                  {activities.map((activity, index) => (
                          <ActivityCard key={index} index={index} activity={activity} activities={setActivities} addAccepted={addAcceptedActivities}/>
                  ))}
            </div>
          </div>
        </div>
      </>
    )
    
}

export default Room