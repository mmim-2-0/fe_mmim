import './App.css';
import Homepage from './Components/Homepage/Homepage';
import ResultsPage from './Components/ResultsPage/ResultsPage';
import Nav from './Components/Nav/Nav';
import DefaultMidForm from './Components/DefaultMidForm/DefaultMidForm';
import UserMidForm from './Components/UserMidForm/UserMidForm';
import MapPage from './Components/MapPage/MapPage';
import Login from './Components/login';
import Logout from './Components/logout';
// import getFetch from './apiCalls.js';
import { BrowserRouter as Router,  Routes,  Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';

const clientId = "1043160436627-t0siob1vmac373h292mh0dohemkjrr5m.apps.googleusercontent.com"

function App() {
  const [userEmail, setUserEmail] = useState(null)
  const [userName, setUserName] = useState(null)
  // if userEmail is null, show not logged in page 
  const [searchCategory, setSearchCategory] = useState('cafe')
  const [addressOne, setAddressOne] = useState(null)
  const [addressTwo, setAddressTwo] = useState(null)
  const [searchResponses, setSearchResponses] = useState([])



  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
      // getFetch('denver', 'austin', 'cafe')
    }

    gapi.load('client:auth2', start)
  })

  // console.log(getFetch())
  return (
    <Router>
      <div className="App">
        <Login 
          userEmail={userEmail}
          setUserEmail={setUserEmail}
          userName={userName}
          setUserName={setUserName}
        />
        <Logout 
          userEmail={userEmail}
          setUserEmail={setUserEmail}
          userName={userName}
          setUserName={setUserName}
        />
        <Routes>
          <Route path='/' element={<Homepage 
            userEmail={userEmail} 
            userName={userName}
            searchCategory={searchCategory}
            setSearchCategory={setSearchCategory}
            addressOne={addressOne}
            setAddressOne={setAddressOne}
            addressTwo={addressTwo}
            setAddressTwo={setAddressTwo}
            searchResponses={searchResponses}
            setSearchResponses={setSearchResponses}
            />}
          />
          <Route path='/results' element={<ResultsPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
