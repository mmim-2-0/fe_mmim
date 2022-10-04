import './DefaultAddress.css';
import { useEffect, useState } from 'react';
import { updateDefaultAddress } from "../../apiCalls";

const DefaultAddress = ({ token, userName, userEmail, userDefaultAddress, setUserDefaultAddress, setAddressOne }) => {

  const [localDefault, setLocalDefault] = useState(userDefaultAddress)

  const defaultAddressHandler = () => {
    console.log("token", token, typeof(token))
    console.log("userName", userName, typeof(userName))
    console.log("userEmail", userEmail, typeof(userEmail))
    console.log("localDefault", localDefault, typeof(localDefault))

    updateDefaultAddress(token, userName, userEmail, localDefault)
    setUserDefaultAddress(localDefault)
    setAddressOne(localDefault)
    setLocalDefault('')
  }

  const handleLocalDefault = (e) => {
    setLocalDefault(e.target.value)
  }

  return (
    <div>
      <h3 className="change-default-title">change your default address:</h3>
      <input className="default-input" type="text" placeholder="new default address" value={localDefault} onChange={handleLocalDefault}></input>
      <button className="update-button" onClick={defaultAddressHandler}>update</button>
    </div>
  )
}

export default DefaultAddress;