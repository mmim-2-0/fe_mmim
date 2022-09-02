import React from 'react';
import getLocations from '../../apiCalls.js';
import { useEffect } from 'react';


const UserMidForm = ({ searchCategory, setSearchCategory, addressOne, setAddressOne, setAddressTwo, searchResponses, setSearchResponses, addressTwoEmail, setAddressTwoEmail, addressTwoManual, setAddressTwoManual }) => {
    
    useEffect(() => {
        setAddressOne(null)
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

    const submitUserForm = (e) => {
        e.preventDefault()
        console.log('submit!')
        if (addressTwoManual) {
            getLocations(addressOne, addressTwoManual, searchCategory)
            .then(data => {
                console.log(data)
                setSearchResponses(data.data.attributes.locations)
            })
        }
        if (addressTwoEmail) {
            getLocations(addressOne, addressTwoEmail, searchCategory)
            .then(data => {
                console.log(data)
                setSearchResponses(data.data.attributes.locations)
            })
        }
    }
    
    return (
        <section>
            <button>Set your default address</button>
            {/* Add logic to save a user's default address - this would have to be a PUT?
            Then, when we add logic to create or get a user when they login with google, 
            we will have to make sure that their address is updated in state? */}
            <form>
            <p>User Mid Form!</p>
            <input type='text' placeholder='Address 1' onChange={addressOneHandler}></input>
            <p>AND</p>
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