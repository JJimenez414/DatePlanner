import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = import.meta.env.PROD === 'production' ? undefined : 'http://localhost:3000';

export const socket = io(URL, {
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 20000,
    autoConnect: true,
    transports: ['websocket', 'polling'],
    forceNew: true
});


// Add connection status listeners
socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('connect_error', (error) => {
    console.error('Connection error:', error);
});

socket.on('disconnect', (reason) => {
    console.log('Disconnected from server:', reason);
});

socket.on('error', (error) => {
    console.error('Socket error:', error);
});

// Export connection status
export const getConnectionStatus = () => {
    return {
        connected: socket.connected,
        disconnected: socket.disconnected,
        id: socket.id
    };
};

