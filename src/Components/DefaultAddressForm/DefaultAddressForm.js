import React from 'react';
import { updateDefaultAddress } from '../../apiCalls.js';


const DefaultAddressForm = ({ setUserDefaultAddress, userDefaultAddress, userName, userEmail, token }) => {
    
    const defaultAddressHandler = (e) => {
        setUserDefaultAddress(e.target.value)
    }

    const submitDefaultAddress = (e) => {
        updateDefaultAddress(token, userName, userEmail, userDefaultAddress)
    }

    return (
        <form>
            <input type="text" placeholder="Set your default address here." onChange={defaultAddressHandler}></input>
            <button onClick={submitDefaultAddress}>Save your address</button>
        </form>
    )
};

export default DefaultAddressForm;