function ActivityCard({key = 0,activity = ""}) {
    return (
        <div key={key} className="activity-card center">
            <p> {activity} </p>
        </div>
    )
}

export default ActivityCard;