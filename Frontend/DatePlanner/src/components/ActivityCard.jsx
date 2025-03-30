import { motion, useAnimation } from "framer-motion";
import { useRef, useState} from "react";

function ActivityCard({ index, activity = "", activities, addAccepted}) {

    const controls = useAnimation();
    const [swiped, setSwiped] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [direction, setDirection] = useState(0);

    // handles when we stop dragging the card
    const handleDragEnd = (_, info) => {
        let swipeLeft = info.offset.x < 0;

        // if the card is swiped more than 100px, then we add it to the accepted activities list
        if (Math.abs(info.offset.x) > 100) {
            // if offset.x is negative, then the card is swiped left, else to the right
            if (info.offset.x < 0)  {
                swipeLeft = true;
            } else {
                swipeLeft = false;
                addAccepted(prev => [...prev, activity]);
            }
            
            // animates the card to the left or right depending on the swipe direction
            controls.start({ x : swipeLeft ? -300 : 300, rotate : swipeLeft ? -15 : 15, transition : {type : "spring", stiffness : 150}})
            setDirection(0);
            setSwiped(true);
            activities((prev => prev.filter((_, i) => index !== i))); // removes swipped activity from list.
        }  else {
            // if the card was not swped, then we animat it to its orginal position
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

    // handles when we are dragging the card
    const handleDrag = (_, info) => {
        // adds a rotation and a direction to the card when dragging
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
