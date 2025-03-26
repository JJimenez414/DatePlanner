import Draggable from 'react-draggable';
import { useRef } from 'react';

function ActivityCard({ activity = "" }) {
    const nodeRef = useRef(null);

    return (
        <div ref={nodeRef} className="activity-card center">
            <p>{activity}</p>
        </div>
    );
}

export default ActivityCard;
