import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useRoom } from '../context/RoomContext';
import { socket } from '../socket';
import removeCircleIcon from '../assets/remove-circle-stroke-rounded.svg';

const ActivityList = () => {

    const [activity, setActivity] = useState(''); // tracks the activity input
    const [activities, setActivities] = useState([]); // tracks the activities user has input
    const { roomID } = useRoom(); // gets the roomID from the context

    function handleAddActivity(e) { // 
        e.preventDefault();
        setActivities([...activities, activity])
        setActivity('');
    }

    function handleDeleteActivity(index) { // deletes an activity from the list 
        setActivities(activities.filter((_, i) => i != index))
    }

    function handleSubmit() {  // submits the activites to the server
        socket.emit('submit-activities', {
            roomID: roomID,
            activities: activities
        });
    }

    return (
       <>
        <div className="activity-container center">

            <div className="activity-component activity-list-container">

                <div className="activity-component activity-list-header center">

                    <p> {roomID} </p>  
                    
                </div>

                <div className="activity-component activity-list-body">

                    {activities.map((activity, index) => (
                        <div key={index} onClick={() => handleDeleteActivity(index)} className="activity-list-item">
                            <span key={index}>{activity}</span>
                            <img src={removeCircleIcon} alt="remove" className="activity-list-delete-icon"/>
                        </div>
                    ))}

                </div>

                <form className="activity-component activity-list-form">

                    <input type="text" value={activity} onChange={(e) => { setActivity(e.target.value);}} placeholder="Add an activity" className="activity-list-input"/>
                    <button type="" onClick={handleAddActivity} className="activity-list-button activity-list-add-button">Add</button>
                    <Link className="activity-list-link" to={'/submitionswait'}>
                        <button type="submit" onClick={() => handleSubmit()} className='activity-list-button activity-list-submit-button'>Submit</button>
                    </Link>

                </form>

            </div>
           
        </div>
       </>

    );
};

export default ActivityList;