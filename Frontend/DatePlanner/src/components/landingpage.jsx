import React from 'react';
import {Link } from 'react-router-dom';

function Landingpage() {

  return (
    <> 
        <div className='btn-container center'>

            <Link to={'/createroom'}> 
              <button className='btn'> Create Room </button>
            </Link>

            <Link to={'/joinroom'}> 
              <button className='btn'> Join Room </button>
            </Link>

        </div>
        
    </>

  )
}

export default Landingpage