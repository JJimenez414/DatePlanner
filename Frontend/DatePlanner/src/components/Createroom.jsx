import { useState } from 'react'
import {v4 as uuidv4} from 'uuid';

function Createroom() {

    const[roomID, setroomID] = useState(uuidv4());

    function newRoom() {
        
        setroomID(uuidv4)

    }

    return (

    <>
        <div> 

            <p> 
                {roomID}
            </p>

            <button onClick={() => newRoom()}> New Room </button>

        </div>
    </>
    
  )
}

export default Createroom