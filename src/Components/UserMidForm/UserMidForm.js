import React from 'react';
import { getLocations, getGuestUser } from '../../apiCalls.js';
import { useEffect } from 'react';
import BarIcon from '../../assets/Bar icon.js';
import CafeIcon from '../../assets/Cafe icon.js';
import LibraryIcon from '../../assets/Library icon.js';
import ParkIcon from '../../assets/Park icon.js';
import RestaurantIcon from '../../assets/Restaurant icon.js';
import { useNavigate } from 'react-router-dom';
import './UserMidForm.css';
import { useState } from 'react';

const UserMidForm = ({ searchCategory, setSearchCategory, addressOne, setAddressOne, setAddressTwo, searchResponses, setSearchResponses, addressTwoEmail, setAddressTwoEmail, addressTwoManual, setAddressTwoManual, userDefaultAddress, setUserDefaultAddress, defaultFormView, setDefaultFormView, userName, userEmail, token, setSearchCenter }) => {
    
    const [requiredInput, setRequiredInput] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [failedEmail, setFailedEmail] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
        setAddressOne(userDefaultAddress || '')
        setAddressTwo(null)
        setSearchCategory('cafe')
    }, [])
    
    const addressOneHandler = (e) => {
        setAddressOne(e.target.value)
        if (addressOne) {
            setRequiredInput(true)
        } else {
            setRequiredInput(false)
        }
    }

    const addressTwoHandlerEmail = (e) => {
        setAddressTwoEmail(e.target.value)
        setRequiredInput(true)
        setAddressTwoManual('')
    }

    const addressTwoHandlerManual = (e) => {
        setAddressTwoManual(e.target.value)
        setRequiredInput(true)
        setAddressTwoEmail('')
    }


    const submitUserForm = (e) => {
        e.preventDefault()
        if (addressTwoManual && requiredInput && addressOne) {
            getLocations(addressOne, addressTwoManual, searchCategory)
            .then(data => {
                console.log(data)
                setSearchResponses(data.data.attributes.locations)
                setSearchCenter(data.data.attributes.map_argument.map_center)
                setErrorMessage(false)
            })
            .then(data => navigate(`/results`))
        }
        if (addressTwoEmail && requiredInput && addressOne) {
            getGuestUser(token, addressTwoEmail)
                .then((data) => {
                    setFailedEmail(false)
                    return data.data.attributes.address
                })
                .catch(data => setFailedEmail(true))
                .then(address => {
                    getLocations(addressOne, address, searchCategory)
                        .then(data => {
                            console.log(data)
                            setSearchResponses(data.data.attributes.locations)
                            setSearchCenter(data.data.attributes.map_argument.map_center)
                            setErrorMessage(false)
                        })
                    .then(data => navigate(`/results`))
                }) 
        }
        else {
            setErrorMessage(true)
        }
    }
    
    return (
        <section className="user-mid">
            <h2>Find a place to meet.</h2>
            <form>
            <p><b>Your</b> starting point is...</p>
            <input type='text' placeholder={userDefaultAddress} defaultValue={userDefaultAddress} onChange={addressOneHandler}></input>
            <p className="second-address-label"><b>Other</b> party's starting point is...</p>
            <input type='text' placeholder='Other User email' value={addressTwoEmail} onChange={addressTwoHandlerEmail}></input>
            <p>OR</p>
            <input type='text' placeholder='456 Their Street' value={addressTwoManual} onChange={addressTwoHandlerManual}></input>
            <p className="icon-label">Meet at a...</p>
            <div className="category-icons">
                <CafeIcon setSearchCategory={setSearchCategory} searchCategory={searchCategory}/>
                <RestaurantIcon setSearchCategory={setSearchCategory} searchCategory={searchCategory}/>
                <BarIcon setSearchCategory={setSearchCategory} searchCategory={searchCategory}/>
                <LibraryIcon setSearchCategory={setSearchCategory} searchCategory={searchCategory}/>
                <ParkIcon setSearchCategory={setSearchCategory} searchCategory={searchCategory}/>
            </div>
            <button className="search-button" onClick={submitUserForm}><strong>Search the Middle</strong></button>
            {errorMessage && <p className="error-message">Please provide the required input.</p>}
            {failedEmail && <p className="error-message">We can't find a user associated with this email, please try again.</p>}
        </form>
    </section>
    )
};


export default UserMidForm;