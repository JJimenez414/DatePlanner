
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";

function ActivityCard({ activity = "" }) {

    const controls = useAnimation();
    const [swiped, setSwiped] = useState(false);
    const [rotation, setRotation] = useState(0);

    const handleDragEnd = (_, info) => {
        let swipeRight = info.offset.x < 0;

        if (Math.abs(info.offset.x) > 100) {
            if (info.offset.x < 0)  {
                swipeRight = true;
                console.log("swipe right");
            } else {
                swipeRight = false;
                console.log("swipe left");
            }
            

            controls.start({ x : swipeRight ? -300 : 300, rotate : swipeRight ? -15 : 15, transition : {type : "spring", stiffness : 150}})
            setSwiped(true);
        }  else {
            controls.start({
                x : 0, 
                rotate : 0,
                transition: {
                    type: "spring", 
                    stiffness: 150,//spring
                }
            })
        }
    }

    if (swiped) return null;

    return (

        <motion.div className="activity-card center" 
        animate={controls} 
        drag="x"
        whileDrag={{rotate : rotation}} 
        dragConstraints={{left : -150, right : 100}} 
        onDrag={(_, info) => info.offset.x < 0 ? setRotation(-15) : setRotation(15)}
        onDragEnd={handleDragEnd} 
        dragElastic={0}
        initial={{x: 0, rotate: 0}}
        >
            <p>{activity}</p>
        </motion.div>

    );
}

export default ActivityCard;
