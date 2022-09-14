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

const clientId = "514096567087-on7cssmi56nj26j0dbf1gnaakv3o5gq4.apps.googleusercontent.com"

function App() {
  const [userEmail, setUserEmail] = useState(null)
  const [userName, setUserName] = useState(null)
  const [userId, setUserId] = useState(null)
  // if userEmail is null, show not logged in page
  const [searchCategory, setSearchCategory] = useState('cafe')
  const [addressOne, setAddressOne] = useState(null)
  const [addressTwo, setAddressTwo] = useState(null)
  const [searchCenter, setSearchCenter] = useState([45.4, -75.7])
  const [searchResponses, setSearchResponses] = useState([])
  const [addressTwoEmail, setAddressTwoEmail] = useState('')
  const [addressTwoManual, setAddressTwoManual] = useState('')
  const [token, setToken] = useState(null)
  const [userDefaultAddress, setUserDefaultAddress] = useState(null)
  const [defaultFormView, setDefaultFormView] = useState(false)

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

  return (
    <Router>
      <div className="App">
        <Login
          userEmail={userEmail}
          setUserEmail={setUserEmail}
          userName={userName}
          setUserName={setUserName}
          token={token}
          setToken={setToken}
          setUserDefaultAddress={setUserDefaultAddress}
          setUserId={setUserId}
        />
        <Logout
          userEmail={userEmail}
          setUserEmail={setUserEmail}
          userName={userName}
          setUserName={setUserName}
          token={token}
          setToken={setToken}
        />
        <Routes>
          <Route path='/' element={<Homepage
            userEmail={userEmail}
            userName={userName}
            token={token}
            searchCategory={searchCategory}
            setSearchCategory={setSearchCategory}
            addressOne={addressOne}
            setAddressOne={setAddressOne}
            addressTwo={addressTwo}
            setAddressTwo={setAddressTwo}
            searchResponses={searchResponses}
            setSearchResponses={setSearchResponses}
            addressTwoEmail={addressTwoEmail}
            setAddressTwoEmail={setAddressTwoEmail}
            addressTwoManual={addressTwoManual}
            setAddressTwoManual={setAddressTwoManual}
            userDefaultAddress={userDefaultAddress}
            setUserDefaultAddress={setUserDefaultAddress}
            defaultFormView={defaultFormView}
            setDefaultFormView={setDefaultFormView}
            searchCenter={searchCenter}
            setSearchCenter={setSearchCenter}
            />}
          />
          <Route path='/results' element={<ResultsPage
            searchCategory={searchCategory}
            setSearchCategory={setSearchCategory}
            searchResponses={searchResponses}
            setSearchResponses={setSearchResponses}
            searchCenter={searchCenter}
            setSearchCenter={setSearchCenter}
            addressOne={addressOne}
            addressTwo={addressTwo}
            />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
