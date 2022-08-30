import './App.css';
import Homepage from './Components/Homepage/Homepage';
import ResultsPage from './Components/ResultsPage/ResultsPage';
import Nav from './Components/Nav/Nav';
import DefaultMidForm from './Components/DefaultMidForm/DefaultMidForm';
import UserMidForm from './Components/UserMidForm/UserMidForm';
import MapPage from './Components/MapPage/MapPage';
import Login from './Components/login';
import Logout from './Components/logout';
import getFetch from './apiCalls.js';
import { BrowserRouter as Router,  Routes,  Route } from "react-router-dom";
import { useEffect } from 'react';
import { gapi } from 'gapi-script';

const clientId = "1043160436627-t0siob1vmac373h292mh0dohemkjrr5m.apps.googleusercontent.com"

function App() {

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    }

    gapi.load('client:auth2', start)
  })

  console.log(getFetch())
  return (
    <Router>
      <div className="App">
        <Login />
        <Logout />
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/results' element={<ResultsPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
