import React from 'react';
import { getLocations } from '../../apiCalls.js';
import { Link, useNavigate } from 'react-router-dom';


const DefaultMidForm = ({ searchCategory, setSearchCategory, addressOne, setAddressOne, addressTwo, setAddressTwo, searchResponses, setSearchResponses, searchCenter, setSearchCenter }) => {

    let navigate = useNavigate();

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
        e.preventDefault()
        console.log('submit!')
        getLocations(addressOne, addressTwo, searchCategory)
        .then(data => {
            console.log(data)
            setSearchResponses(data.data.attributes.locations)
            setSearchCenter(data.data.attributes.map_argument.map_center)
        })
        .then(data => navigate(`/results`))
    }

    return (
        <section>
            <h1>Find a place to meet.</h1>
            <form>
                <p><b>Your</b> starting point is...</p>
                <p>Enter an address, or just a City or Zip Code</p>
                <input type='text' placeholder='123 Your Street' onChange={addressOneHandler}></input>
                <p><b>Other</b> party's starting point is...</p>
                <p>Enter an address, or just a City or Zip Code</p>
                <input type='text' placeholder='456 Their Street' onChange={addressTwoHandler}></input>
                <p>Meet at a...</p>
                <select onChange={categoryChangeHandler}>
                    <option value="cafe">Cafe</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="bar">Bar</option>
                    <option value="park">Park</option>
                    <option value="library">Library</option>
                </select>
                <button onClick={submitDefaultForm}>Search the Middle </button>
            </form>
        </section>
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
