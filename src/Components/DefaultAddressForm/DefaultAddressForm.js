import React from 'react';

const DefaultAddressForm = ({ setUserDefaultAddress }) => {
    
    const defaultAddressHandler = (e) => {
        setUserDefaultAddress(e.target.value)
    }

    const submitDefaultAddress = () => {
        // Fetch PUT to update the user's default address in the backend!
    }

    return (
        <form>
            <input type="text" placeholder="Set your default address here." onChange={defaultAddressHandler}></input>
            <button onClick={submitDefaultAddress}>Save your address</button>
        </form>
    )
};

export default DefaultAddressForm;