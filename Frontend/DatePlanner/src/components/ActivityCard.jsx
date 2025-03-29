import { motion, useAnimation } from "framer-motion";
import { useRef, useState} from "react";

function ActivityCard({ activity = ""}) {

    const controls = useAnimation();
    const [swiped, setSwiped] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [direction, setDirection] = useState(0);

    const handleDragEnd = (_, info) => {
        let swipeRight = info.offset.x < 0;

        if (Math.abs(info.offset.x) > 100) {
            if (info.offset.x < 0)  {
                swipeRight = true;
                console.log("swipe left");
            } else {
                swipeRight = false;
                console.log("swipe right");
            }
            

            controls.start({ x : swipeRight ? -300 : 300, rotate : swipeRight ? -15 : 15, transition : {type : "spring", stiffness : 150}})
            setDirection(0);
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
            setDirection(0);
        }
    }

    const handleDrag = (_, info) => {
        if(info.offset.x <= -1) {
            setRotation(-15);
            setDirection(-1);
        } else {
            setRotation(15);
            setDirection(1);
        }
    }

    if (swiped) return null;

    return (

        <motion.div className= {direction === 0 ? "activity-card center" : 
                                direction === -1 ? "activity-card center activity-card-drag-left" :
                                "activity-card center activity-card-drag-right"} 
        animate={controls} 
        drag="x"
        whileDrag={{rotate : rotation}} 
        dragConstraints={{left : -150, right : 100}} 
        onDrag={handleDrag}
        onDragEnd={handleDragEnd} 
        dragElastic={0}
        initial={{x: 0, rotate: 0}}
        transition={{type : "spring", stiffness : 90}}
        >
            <p>{activity}</p>
        </motion.div>

    );
}

export default ActivityCard;
