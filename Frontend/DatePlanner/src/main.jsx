import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { RoomProvider } from './context/RoomContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <RoomProvider>
            <App />    
        </RoomProvider>
    </BrowserRouter>
);
