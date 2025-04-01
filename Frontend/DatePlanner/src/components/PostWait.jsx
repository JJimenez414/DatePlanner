import { useEffect, useState } from 'react';
import { socket } from '../socket';


function PostWait() {

    const [ usersDone, setUsersDone] = useState(0);
    const [ numUsers, setNumUsers] = useState(0);
    const [ done, setDone ] = useState(false);

    useEffect(()=> {

        socket.on("receive-done", (payload) => {
            setUsersDone(payload.userDone);
            setNumUsers(payload.numUsers);

            // check if all users are done with their activities

            if (payload.userDone === payload.numUsers) {
                handleDone();
            }
        }) 


    }, [usersDone, numUsers])

    function handleDone() {
        console.log('show matched activitiese');
    }

    return (
        <>
            <p> hello world </p>
        </>
    )   
}

export default PostWait;