import './App.css'
import { Routes, Route } from 'react-router-dom';
import Landingpage from './components/Landingpage.jsx';
import Createroom from './components/Createroom.jsx';
import Joinroom from './components/Joinroom.jsx';

function App() {
  return (
    <Routes>

      <Route path="/" element={<Landingpage/>}/>
      <Route path="/createroom" element={<Createroom/>}/>  
      <Route path="/joinroom" element={<Joinroom/>}/>  

    </Routes>
  )

}

export default App