import React from 'react';
import { getLocations, getGuestUser, getCurrentLocation} from '../../apiCalls.js';
import { useEffect } from 'react';
import BarIcon from '../../assets/Bar icon.js';
import CafeIcon from '../../assets/Cafe icon.js';
import LibraryIcon from '../../assets/Library icon.js';
import ParkIcon from '../../assets/Park icon.js';
import RestaurantIcon from '../../assets/Restaurant icon.js';
import { useNavigate } from 'react-router-dom';
import './UserMidFormMeeting.css';
import { useState } from 'react';

const UserMidFormMeeting = ({ searchCategory, setSearchCategory, addressOne, setAddressOne, setAddressTwo, searchResponses, setSearchResponses, addressTwoEmail, setAddressTwoEmail, userDefaultAddress, setUserDefaultAddress, defaultFormView, setDefaultFormView, userName, userEmail, token, setSearchCenter, failedFetch, setFailedFetch }) => {

	const [requiredInput, setRequiredInput] = useState(false);
	const [errorMessage, setErrorMessage] = useState(false);
	const [failedEmail, setFailedEmail] = useState(false);
	const [currentLocation, setCurrentLocation] = useState(null)

	let navigate = useNavigate();

	useEffect(() => {
		setAddressOne(null)
		setAddressTwo(null)
		setSearchCategory('cafe')
	}, []);

	const addressOneHandler = (e) => {
		setAddressOne(e.target.value)
		if (addressOne) {
				setRequiredInput(true)
				setErrorMessage(false)
		} else {
				setRequiredInput(false)
		}
	};

	const useDefaultAddress = (e) => {
    if (e.target.checked === true) {
      setAddressOne(userDefaultAddress)
    } else {
      setAddressOne("")
    }
    if (addressOne) {
        setRequiredInput(true)
        setErrorMessage(false)
    } else {
        setRequiredInput(false)
    }
  };

  const handleCurrentLocation = (e) => {
   	if (e.target.checked === true) {
   		navigator.geolocation.getCurrentPosition((position) =>  {
      var location = position.coords.latitude + "," + position.coords.longitude;
      getCurrentLocation(location).then(d => {setAddressOne(d.results[0].locations[0].street + " " + d.results[0].locations[0].adminArea5 + " " + d.results[0].locations[0].adminArea3 + " " +d.results[0].locations[0].adminArea1)})
    })
    } else {
      setAddressOne("")
    }
  };

	const addressTwoHandlerEmail = (e) => {
		setAddressTwoEmail(e.target.value)
		if (e.target.value) {
			setRequiredInput(true)
		} else {
			setRequiredInput(false)
		}
		setErrorMessage(false)
	};

	const submitUserForm = (e) => {
		localStorage.clear()
		setErrorMessage(false)
		setFailedEmail(false)
		setFailedFetch(false)
		e.preventDefault()
		if (requiredInput && addressOne) {
			localStorage.setItem('addressOne', JSON.stringify(addressOne))
			getLocations(addressOne, searchCategory)
			.then(data => {
				setSearchResponses(data.data.attributes.locations)
				setSearchCenter(data.data.attributes.map_argument.map_center)
				localStorage.setItem('searchResponses', JSON.stringify(data.data.attributes.locations))
				localStorage.setItem('searchCenter', JSON.stringify(data.data.attributes.map_argument.map_center))
				localStorage.setItem('searchCategory', JSON.stringify(searchCategory))
				setErrorMessage(false)
				setFailedFetch(false)
			})
			.then(data => navigate(`/results`))
			.catch(data => {
				setFailedFetch(true)
				return null
			})
		}
		if (addressTwoEmail && requiredInput && addressOne) {
			localStorage.setItem('addressOne', JSON.stringify(addressOne))
			localStorage.setItem('addressTwoEmail', JSON.stringify(addressTwoEmail))
			getGuestUser(token, addressTwoEmail)
				.then((data) => {
					setFailedEmail(false)
					getLocations(addressOne, data.data.attributes.address,searchCategory)
					.then(data => {
						setSearchResponses(data.data.attributes.locations)
						setSearchCenter(data.data.attributes.map_argument.map_center)
						localStorage.setItem('searchResponses', JSON.stringify(data.data.attributes.locations))
						localStorage.setItem('searchCenter', JSON.stringify(data.data.attributes.map_argument.map_center))
						localStorage.setItem('searchCategory', JSON.stringify(searchCategory))
						setErrorMessage(false)
						setFailedFetch(false)
					})
					.then(data => navigate(`/results`))
					.catch(data => setFailedFetch(true))
				})
				.catch(data => {
					setFailedEmail(true)
				})
		}
		if (!requiredInput) {
			setErrorMessage(true)
		}
	};

	return (
			<section className="user-mid">
					<h2>Find a place in the middle.</h2>
					<form>
					<p><b>Your</b> starting point is...</p>
					<p className="address-instructions">Enter your address or update default address in Meeting Dashboard</p>
					<label>
					<p id='checkbox'>Use default address
					<input id='checkbox' type='checkbox' onChange={useDefaultAddress} />
					</p>
					</label>
					<label>
          <p id='checkbox_current_address'>Use current location
          <input id='checkbox' type='checkbox' onChange={handleCurrentLocation} />
          </p>
          </label>
					<input type='text' placeholder="123 Your Street" value={addressOne} onChange={useDefaultAddress, addressOneHandler}></input>
					<p className="second-address-label"><b>Meet</b> with...</p>
					<p className="address-instructions">Enter other party's email address</p>
					<input type='text' placeholder='YourFriend@example.com' value={addressTwoEmail} onChange={addressTwoHandlerEmail}></input>
					{(addressTwoEmail === userEmail) && <p className="email-error-message">Hey! Don't use your own email here please.</p>}
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
					{failedFetch && <p className="failed-fetch-error">Oh no! There are no results for this search, please try other locations.</p>}
			</form>
	</section>
	)
};

export default UserMidFormMeeting;
