import React from 'react';
import { getLocations } from '../../apiCalls.js';
import BarIcon from '../../assets/Bar icon.js';
import CafeIcon from '../../assets/Cafe icon.js';
import LibraryIcon from '../../assets/Library icon.js';
import ParkIcon from '../../assets/Park icon.js';
import RestaurantIcon from '../../assets/Restaurant icon.js';
import { Link, useNavigate } from 'react-router-dom';

const DefaultMidForm = ({ searchCategory, setSearchCategory, addressOne, setAddressOne, addressTwo, setAddressTwo, searchResponses, setSearchResponses, searchCenter, setSearchCenter }) => {

    let navigate = useNavigate();

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
                <CafeIcon setSearchCategory={setSearchCategory}/>
                <RestaurantIcon setSearchCategory={setSearchCategory}/>
                <BarIcon setSearchCategory={setSearchCategory}/>
                <LibraryIcon setSearchCategory={setSearchCategory}/>
                <ParkIcon setSearchCategory={setSearchCategory}/>
                <button onClick={submitDefaultForm}>Search the Middle</button>
            </form>
        </section>
    )

    //need to update styling so user knows which icon has been selected
    //update styling for overlay description over image

};

export default DefaultMidForm;
