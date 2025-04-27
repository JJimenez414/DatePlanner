import { useEffect, useState } from 'react';
import { socket } from '../socket';
import MatchedCards from './MatchedCards';


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
            <div className='postWaitConatainer'>
                <p className="postWaitTittle"> Matched Activities </p>
                <div className='postWaitCardContainer'>
                    {activities.map((activity, index) => (
                        <MatchedCards activity={activity}/>
                    ))}
                </div>
            </div>
        </>
    )   
}

export default PostWait;