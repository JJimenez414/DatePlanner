
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";

function ActivityCard({ activity = "" }) {

    const controls = useAnimation();
    const [swiped, setSwiped] = useState(false);
    // const [swipeRight, setSwipeRight] = useState();

    const handleDragEnd = (_, info) => {
        let swipeRight = false

        if (Math.abs(info.offset.x) > 100) {
            if (info.offset.x < 0)  {
                swipeRight = true
                console.log("swipe right");
            } else {
                swipeRight = false
                console.log("swipe left");
            }
            setSwiped(true);
            console.log(_);
            console.log(info);

            controls.start({ x : swipeRight ? 300 : -300, rotate : swipeRight ? 100 : -100})
        }  else {
            controls.start({
                x : 0, 
                rotate : 0,
                transition: {
                    type: "spring", 
                    stiffness: 100,//spring
                    damping: 5//shock obsorb
                }
            })
        }
    }

    if (swiped) return null;

    return (

        <motion.div className="activity-card center" 
        animate={controls} drag="x" 
        dragConstraints={{left : -100, right : 100}} 
        onDragEnd={handleDragEnd} 
        dragElastic={0}
        initial={{x: 0, rotate: 0}}
        >
            <p>{activity}</p>
        </motion.div>

    );
}

export default ActivityCard;
