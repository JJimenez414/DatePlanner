import { useEffect, useState } from 'react';
import { socket } from '../socket';


function PostWait() {

    // const [ usersDone, setUsersDone] = useState(0);
    // const [ numUsers, setNumUsers] = useState(0);
    const [ activities, setActivities ] = useState([]);

    useEffect(()=> {

        socket.on("receive-done", (payload) => {
            setActivities(payload.acceptedActivities);
        }) 

        return () => {
            socket.off("receive-done");
        };

    }, [activitiess])

    function handleDone() {
        console.log('show matched activitiese');
    }

    console.log(activities);

    return (
        <>
            <p> hello world </p>
        </>
    )   
}

export default PostWait;