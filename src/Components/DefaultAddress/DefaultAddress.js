import './DefaultAddress.css';
import { useState } from 'react';
import { updateDefaultAddress, getCurrentLocation } from "../../apiCalls";

const DefaultAddress = ({ token, userName, userEmail, userDefaultAddress, setUserDefaultAddress, setAddressOne, setCurrentLocation }) => {

  const [localDefault, setLocalDefault] = useState(userDefaultAddress);

  const defaultAddressHandler = () => {
    updateDefaultAddress(token, userName, userEmail, localDefault)
    setUserDefaultAddress(localDefault)
    setAddressOne(localDefault)
    setLocalDefault('')
  };

  const handleLocalDefault = (e) => {
    setLocalDefault(e.target.value)
  };

  const handleCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) =>  {
      var location = position.coords.latitude + "," + position.coords.longitude;
      getCurrentLocation(location).then(d => {setLocalDefault(d.results[0].locations[0].street + " " + d.results[0].locations[0].adminArea5 + " " + d.results[0].locations[0].adminArea3 + " " +d.results[0].locations[0].adminArea1)})
    })
  };

  return (
    <div>
      <h2 className="myinfo-title">My Info</h2>
      <div className="myinfo-container">
        <p className="username">Username: {userName}</p>
        <p className="default-address"><strong>Default Address:</strong> {userDefaultAddress}</p>
        <h3 className="change-default-title">change your default address:</h3>
        <input className="default-input" type="text" placeholder="new default address" value={localDefault} onChange={handleLocalDefault}></input>
        <button className="update-button" onClick={defaultAddressHandler}>update</button>
        <button className="update-button" onClick={handleCurrentLocation}>find current location</button>
      </div>
    </div>
  )
};

export default DefaultAddress;
