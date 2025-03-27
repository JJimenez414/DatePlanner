import { useRef } from 'react';

function ActivityCard({ activity = "" }) {

    return (
        <div className="activity-card center">
            <p>{activity}</p>
        </div>
    );
}

export default ActivityCard;
