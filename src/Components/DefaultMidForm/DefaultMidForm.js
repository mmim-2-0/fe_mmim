import React from 'react';
import { getLocations } from '../../apiCalls.js';
import BarIcon from '../../assets/Bar icon.js';
import CafeIcon from '../../assets/Cafe icon.js';
import LibraryIcon from '../../assets/Library icon.js';
import ParkIcon from '../../assets/Park icon.js';
import RestaurantIcon from '../../assets/Restaurant icon.js';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './DefaultMidForm.css';

const DefaultMidForm = ({ searchCategory, setSearchCategory, addressOne, setAddressOne, addressTwo, setAddressTwo, setSearchResponses, setSearchCenter }) => {

	const [errorMessage, setErrorMessage] = useState(false);

	useEffect(() => {
			setAddressOne('')
			setAddressTwo('')
			setSearchCategory('cafe')
	}, []);

	let navigate = useNavigate();

	const addressOneHandler = (e) => {
			setAddressOne(e.target.value)
	};

	const addressTwoHandler = (e) => {
			setAddressTwo(e.target.value)
	};

	const submitDefaultForm = (e) => {
		e.preventDefault()
		if (addressOne && addressTwo) {
				setErrorMessage(false)
		} else {
				setErrorMessage(true)
		}

		if (addressOne && addressTwo) {
				getLocations(addressOne, addressTwo, searchCategory)
				.then(data => {
						console.log(data)
						setSearchResponses(data.data.attributes.locations)
						setSearchCenter(data.data.attributes.map_argument.map_center)
				})
				.then(data => navigate(`/results`))
		}
	};

	return (
		<section className="default-mid">
			<h2>Find a place in the middle.</h2>
		<form>
				<p><b>Your</b> starting point is...</p>
				<p className="address-instructions">Enter an address, or just a City or Zip Code</p>
				<input type='text' placeholder='123 Your Street' onChange={addressOneHandler}></input>
				<p className="second-address-label"><b>Other</b> party's starting point is...</p>
				<p className="address-instructions">Enter an address, or just a City or Zip Code</p>
				<input type='text' placeholder='456 Their Street' onChange={addressTwoHandler}></input>
				<p className="icon-label">Meet at a...</p>
				<div className="category-icons">
						<CafeIcon setSearchCategory={setSearchCategory} searchCategory={searchCategory}/>
						<RestaurantIcon setSearchCategory={setSearchCategory} searchCategory={searchCategory}/>
						<BarIcon setSearchCategory={setSearchCategory} searchCategory={searchCategory}/>
						<LibraryIcon setSearchCategory={setSearchCategory} searchCategory={searchCategory}/>
						<ParkIcon setSearchCategory={setSearchCategory} searchCategory={searchCategory}/>
				</div>
				<button className="search-button" onClick={submitDefaultForm}><strong>Search the Middle</strong></button>
				{errorMessage && <p className="error-message">Please provide the required input.</p>}
			</form>
		</section>
	)
};

export default DefaultMidForm;
