import React from 'react';
import { getLocations } from '../../apiCalls.js';
import { Link } from 'react-router-dom';


const DefaultMidForm = ({ searchCategory, setSearchCategory, addressOne, setAddressOne, addressTwo, setAddressTwo, searchResponses, setSearchResponses }) => {

    const categoryChangeHandler = (e) => {
        setSearchCategory(e.target.value)
    }

    const addressOneHandler = (e) => {
        setAddressOne(e.target.value)
    }

    const addressTwoHandler = (e) => {
        setAddressTwo(e.target.value)
    }

    const submitDefaultForm = (e) => {
        // e.preventDefault()
        console.log('submit!')
        getLocations(addressOne, addressTwo, searchCategory)
        .then(data => {
            console.log(data)
            setSearchResponses(data.data.attributes.locations)
        })
    }

    return (
        <form>
            <input type='text' placeholder='Address 1' onChange={addressOneHandler}></input>
            <input type='text' placeholder='Address 2' onChange={addressTwoHandler}></input>
            <select onChange={categoryChangeHandler}>
                <option value="cafe">Cafe</option>
                <option value="restaurant">Restaurant</option>
                <option value="bar">Bar</option>
                <option value="park">Park</option>
                <option value="library">Library</option>
            </select>
            <Link to="/results">
              <button onClick={submitDefaultForm}>Find Midpoint</button>
            </Link>
        </form>
    )

    // Store both address inputs in state (maybe location1 & location2?)
    // Store the dropdown option in state as well!

    // Attach a fetch to the 'find a midpoint' button that will use state as query params
    // Store the 5 responses in state?

    // When we render the responses, we can access them because they're in state

    // Are US zip codes working yet?
    // Is there an option to not choose a category/keyword? Does case matters
};

export default DefaultMidForm;
