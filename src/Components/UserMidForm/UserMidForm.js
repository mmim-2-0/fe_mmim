import React from 'react';
import { getLocations } from '../../apiCalls.js';
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
            // additional endpoint to fetch other user's default address based on their email
            // Then, setAddressTwoEmail once that fetch resolves
            // Then, fire the getLocations fetch in a .then() after the second address is set in state
            getLocations(addressOne, addressTwoEmail, searchCategory)
            .then(data => {
                console.log(data)
                setSearchResponses(data.data.attributes.locations)
                setSearchCenter(data.data.attributes.map_argument.map_center)
            })
            .then(data => navigate(`/results`))
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

// Olivia's plan for 9.10:
// Saving a user default address
// Only allow if a user is logged in (this button should only be accessible this way anyway)
// When a user clicks this button - have something in State trigger another form below this button?
// Probably not a pop up, but can reevaluate?
// When they type in their default address, and click 'save', store this address in State AND 
// Send a PUT request to update this user's address in the backend
// Add a line to useState and set the default address when a user logs in if there is a saved address
// Will this button change to 'change default address' if a user already has a default address saved?
// And will need to keep functionality for a user to still physically type their address if they don't want to use the default

// All of the above are done!
// Now: we need logic to make sure we're searching correctly based on which addresses a user is using. Ex: Their default address & searchng for another user by their address. OR Their default address & searching for a midpoint by physically typing an address in


// Next steps for Olivia 9.10:
// Get the navigation bar set up with the different 'tabs' Karlo has laid out in his wireframe
// I don't want to do any styling yet, but I can get the different tabs going at least
// Router? Do we want to implement the newest version or do we not care? Message Nikki & Rachel about this
// 



export default UserMidForm;