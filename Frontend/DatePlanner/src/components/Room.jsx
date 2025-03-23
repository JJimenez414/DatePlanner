import React, {useEffect, useState} from 'react'
import { socket } from '../socket'

function Room() {

    useEffect(() => {

        socket.on("join-message", (args) => {
            console.log(args);
        })

        return () => {
            socket.off("join-message");
        }

    }, [])

  return (
    <div>Room</div>
  )
}

export default Room