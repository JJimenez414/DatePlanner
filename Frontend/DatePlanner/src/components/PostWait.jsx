import { useEffect, useState } from 'react';
import { socket } from '../socket';


function PostWait() {

    const [ activities, setActivities ] = useState([]);

    useEffect(()=> {

        socket.on("receive-done", (payload) => {
            setActivities(payload.acceptedActivities);
        }) 

        return () => {
            socket.off("receive-done");
        };

    }, [activities])

    return (
        <>
            <p> hello world </p>

            <div>
                {activities.map((activity) => {
                    <p> {activity} </p>
                })}
            </div>
        </>
    )   
}

export default PostWait;