import React from 'react';
import { getLocations, getGuestUser } from '../../apiCalls.js';
import { useEffect } from 'react';
import DefaultAddressForm from '../../Components/DefaultAddressForm/DefaultAddressForm';
import BarIcon from '../../assets/Bar icon.js';
import CafeIcon from '../../assets/Cafe icon.js';
import LibraryIcon from '../../assets/Library icon.js';
import ParkIcon from '../../assets/Park icon.js';
import RestaurantIcon from '../../assets/Restaurant icon.js';
import { Link, useNavigate } from 'react-router-dom';
import './UserMidForm.css';

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
        <section className="user-mid">
            <h2>Find a place to meet.</h2>
            <form>
            <p><b>Your</b> starting point is...</p>
            <input type='text' placeholder={userDefaultAddress} defaultValue={userDefaultAddress} onChange={addressOneHandler}></input>
            {!userDefaultAddress && <button className="default-address-button" onClick={defaultAddressFormHandler}>Set your default address</button>}
            {userDefaultAddress && <button className="default-address-button" onClick={defaultAddressFormHandler}>Change your default address</button>}
            {defaultFormView && <DefaultAddressForm 
                setUserDefaultAddress={setUserDefaultAddress}
                userDefaultAddress={userDefaultAddress}
                userName={userName}
                userEmail={userEmail}
                token={token}
            />}
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
        </form>
    </section>
    )
};


export default UserMidForm;