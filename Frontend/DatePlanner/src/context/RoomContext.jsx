import { createContext, useContext, useState } from 'react';

// 1. create a context
// 2. create a provider
// 3. use the context in the component.

const RoomContext = createContext(); //creates a global state (RoomContext), which can be accessed by any component inside the provider

export function RoomProvider({ children }) {
    const [roomID, setRoomID] = useState(null); //  is a React component that wraps the entire app (or part of it) and provides the roomID state to all its children

    const value = { // value we are going to prvoide contxt to
        roomID,
        setRoomID
    };

    return (
        <RoomContext.Provider value={value}>
            {children}
        </RoomContext.Provider>
    );
}

// prevents repetative use of useContext
export function useRoom() {
    const context = useContext(RoomContext);
    if (!context) {
        throw new Error('useRoom must be used within a RoomProvider');
    }
    return context;
} 