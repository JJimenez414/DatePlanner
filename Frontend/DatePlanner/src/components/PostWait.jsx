import { useEffect, useState } from 'react';
import { socket } from '../socket';


function PostWait() {

    const [ activities, setActivities ] = useState([]);

    useEffect(()=> {

        socket.on("receive-done", (payload) => {
            setActivities(payload.acceptedActivities);
            console.log(`activities: ${payload.acceptedActivities}`)
        }) 

        return () => {
            socket.off("receive-done");
        };

    }, [activities])


    return (
        <>
            <p> matched activities </p>

            <ul>
                {activities.map((activity, index) => (
                    <li key={index}> {activity} </li>
                ))}
            </ul>
        </>
    )   
}

export default PostWait;