import React from 'react';
import { getLocations, getGuestUser } from '../../apiCalls.js';
import { useEffect } from 'react';
import DefaultAddressForm from '../../Components/DefaultAddressForm/DefaultAddressForm';
import { Link, useNavigate } from 'react-router-dom';


const UserMidForm = ({ searchCategory, setSearchCategory, addressOne, setAddressOne, setAddressTwo, searchResponses, setSearchResponses, addressTwoEmail, setAddressTwoEmail, addressTwoManual, setAddressTwoManual, userDefaultAddress, setUserDefaultAddress, defaultFormView, setDefaultFormView, userName, userEmail, token, setSearchCenter }) => {
    
    let navigate = useNavigate();

    useEffect(() => {
        setAddressOne(userDefaultAddress || null)
        setAddressTwo(null)
        setSearchCategory('cafe')
    }, [])
    
    const addressOneHandler = (e) => {
        setAddressOne(e.target.value)
    }
    
    const categoryChangeHandler = (e) => {
        setSearchCategory(e.target.value)
    }

    const addressTwoHandlerEmail = (e) => {
        setAddressTwoEmail(e.target.value)
        setAddressTwoManual('')
    }

    const addressTwoHandlerManual = (e) => {
        setAddressTwoManual(e.target.value)
        setAddressTwoEmail('')
    }


    // Refactor this function to work the same as with a guest user
    // Need logic before this to figure out which addresses to use for each user?
    const submitUserForm = (e) => {
        e.preventDefault()
        if (addressTwoManual) {
            getLocations(addressOne, addressTwoManual, searchCategory)
            .then(data => {
                console.log(data)
                setSearchResponses(data.data.attributes.locations)
                setSearchCenter(data.data.attributes.map_argument.map_center)
            })
            .then(data => navigate(`/results`))
        }
        if (addressTwoEmail) {
            getGuestUser(token, addressTwoEmail)
                .then((data) => {
                    return data.data.attributes.address
                })
                .then(address => {
                    getLocations(addressOne, address, searchCategory)
                        .then(data => {
                            console.log(data)
                            setSearchResponses(data.data.attributes.locations)
                            setSearchCenter(data.data.attributes.map_argument.map_center)
                         })
                    .then(data => navigate(`/results`))
                }) 
        }
    }

    const defaultAddressFormHandler = () => {
        setDefaultFormView(true);
    }
    
    return (
        <section>
            {!userDefaultAddress && <button onClick={defaultAddressFormHandler}>Set your default address</button>}
            {userDefaultAddress && <button onClick={defaultAddressFormHandler}>Change your default address</button>}
            {defaultFormView && <DefaultAddressForm 
                setUserDefaultAddress={setUserDefaultAddress}
                userDefaultAddress={userDefaultAddress}
                userName={userName}
                userEmail={userEmail}
                token={token}
            />}
            <form>
            <h2>Address One:</h2>
            <input type='text' placeholder={userDefaultAddress} defaultValue={userDefaultAddress} onChange={addressOneHandler}></input>
            <h2>Address Two:</h2>
            <input type='text' placeholder='Other User email' value={addressTwoEmail} onChange={addressTwoHandlerEmail}></input>
            <p>OR</p>
            <input type='text' placeholder='Address 2' value={addressTwoManual} onChange={addressTwoHandlerManual}></input>
            <select onChange={categoryChangeHandler}>
                <option value="cafe">Cafe</option>
                <option value="restaurant">Restaurant</option>
                <option value="bar">Bar</option>
                <option value="park">Park</option>
                <option value="library">Library</option>
            </select>
            <button onClick={submitUserForm}>Find a Midpoint</button>
        </form>
    </section>
    )
};


export default UserMidForm;