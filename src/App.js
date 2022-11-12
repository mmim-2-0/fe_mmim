import './App.css';
import Homepage from './Components/Homepage/Homepage';
import ResultsPage from './Components/ResultsPage/ResultsPage';
import Nav from './Components/Nav/Nav';
import DashboardPage from './Components/DashboardPage/DashboardPage';
import { BrowserRouter as Router,  Routes,  Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID

function App() {
  const [userEmail, setUserEmail] = useState(null)
  const [userName, setUserName] = useState(null)
  const [userId, setUserId] = useState(JSON.parse(localStorage.getItem('userId')))
  const [searchCategory, setSearchCategory] = useState(JSON.parse(localStorage.getItem('searchCategory')) || "cafe")
  const [addressOne, setAddressOne] = useState(null)
  const [addressTwo, setAddressTwo] = useState(null)
  const [searchCenter, setSearchCenter] = useState([45.4, -75.7])
  const [searchResponses, setSearchResponses] = useState([])
  const [addressTwoEmail, setAddressTwoEmail] = useState('')
  const [addressTwoManual, setAddressTwoManual] = useState('')
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')))
  const [userDefaultAddress, setUserDefaultAddress] = useState(null)
  const [defaultFormView, setDefaultFormView] = useState(false)
  const [checkedMeetingLocations, setCheckedMeetingLocations] = useState([])
  const [userMeetings, setUserMeetings] = useState([]);
  const [pageTitle, setPageTitle] = useState('home');

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    }

    gapi.load('client:auth2', start)
  })

  return (
    <Router>
      <div className="App">
        <Nav
          userEmail={userEmail}
          setUserEmail={setUserEmail}
          userName={userName}
          setUserName={setUserName}
          token={token}
          setToken={setToken}
          setUserDefaultAddress={setUserDefaultAddress}
          setUserId={setUserId}
          userId={userId}
          userMeetings={userMeetings}
          setUserMeetings={setUserMeetings}
          pageTitle={pageTitle}
          setPageTitle={setPageTitle}
        />
        <Routes>
          <Route path='/' element={<Homepage
            userEmail={userEmail}
            userName={userName}
            userId={userId}
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
            userMeetings={userMeetings}
            setPageTitle={setPageTitle}
            setCheckedMeetingLocations={setCheckedMeetingLocations}
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
            addressTwoManual={addressTwoManual}
            checkedMeetingLocations={checkedMeetingLocations}
            setCheckedMeetingLocations={setCheckedMeetingLocations}
            userEmail={userEmail}
            token={token}
            userId={userId}
            addressTwoEmail={addressTwoEmail}
            setPageTitle={setPageTitle}
            />}
          />
          <Route path='/dashboard' element={<DashboardPage
            userMeetings={userMeetings}
            userId={userId}
            userName={userName}
            userEmail={userEmail}
            token={token}
            setPageTitle={setPageTitle}
            userDefaultAddress={userDefaultAddress}
            setUserDefaultAddress={setUserDefaultAddress}
            setUserMeetings={setUserMeetings}
            setAddressOne={setAddressOne}
            setCheckedMeetingLocations={setCheckedMeetingLocations}
            />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
