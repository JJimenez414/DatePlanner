import './App.css'
import APIRequest from './APIRequest';

function App() {

  function test(e) {
    e.preventDefault();
    
    APIRequest.sendClick(e.target.innerText);
  
  }

  return (
    <>
      <button onClick={test}> Person1 </button>

      <button onClick={test}> Person2 </button>
    </>
  )

}

export default App