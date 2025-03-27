
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";

function ActivityCard({ activity = "" }) {

    const controls = useAnimation();
    const [swiped, setSwiped] = useState(false);
    const [swipeRight, setSwipeRight] = useState();

    const handleDragEnd = (_, info) => {

        if (Math.abs(info.offset.x) > 100) {
            if (info.offset.x < 0)  {
                setSwipeRight(true);
            } else {
                setSwipeRight(false);
            }
            setSwiped(true);

            controls.start({ x : swipeRight ? 300 : -300, opacity : 0, rotate : swipeRight ? 20 : -20})
        }  else {
            controls.start ({x : 0, rotate : 0})
        }
    }

    if (swiped) return null;

    return (

        <motion.div className="activity-card center" drag="x" dragConstraints={{left : -50, right : 50}} onDragEnd={handleDragEnd} initial={{x: 0, rotate: 0}} transition={{type: "spring", stiffness: 300, damping: 20}}>
            <p>{activity}</p>
        </motion.div>

    );
}

export default ActivityCard;
