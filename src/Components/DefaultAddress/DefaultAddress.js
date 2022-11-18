import './DefaultAddress.css';
import { useState } from 'react';
import { updateDefaultAddress } from "../../apiCalls";

const DefaultAddress = ({ token, userName, userEmail, userDefaultAddress, setUserDefaultAddress, setAddressOne }) => {

  const [localDefault, setLocalDefault] = useState(userDefaultAddress);
  const [defaultAddressError, setDefaultAddressError] = useState(false)

  const defaultAddressHandler = () => {
    updateDefaultAddress(token, userName, userEmail, localDefault)
    .then(result => {
      setUserDefaultAddress(localDefault)
      setAddressOne(localDefault)
      setLocalDefault('')
      setDefaultAddressError(false)
    })
    .catch(err => setDefaultAddressError(true))
  };

  const handleLocalDefault = (e) => {
    setLocalDefault(e.target.value)
  };

  return (
    <div>
      <h2 className="myinfo-title">My Info</h2>
      <div className="myinfo-container">
        <p className="username">Username: {userName}</p>
        <p className="default-address"><strong>Default Address:</strong> {userDefaultAddress}</p>
        <h3 className="change-default-title">Update my default address:</h3>
        <input className="default-input" type="text" placeholder="new default address" value={localDefault} onChange={handleLocalDefault}></input>
        <button className="update-button" onClick={defaultAddressHandler}>update</button>
        {defaultAddressError && <p className="error-message">Please enter a valid address.</p>}
      </div>
    </div>
  )
};

export default DefaultAddress;