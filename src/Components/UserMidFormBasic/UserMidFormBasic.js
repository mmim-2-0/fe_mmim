import React from "react";
import {
  getLocations,
  getGuestUser,
  getCurrentLocation,
} from "../../apiCalls.js";
import { useEffect } from "react";
import BarIcon from "../../assets/Bar icon.js";
import CafeIcon from "../../assets/Cafe icon.js";
import LibraryIcon from "../../assets/Library icon.js";
import ParkIcon from "../../assets/Park icon.js";
import RestaurantIcon from "../../assets/Restaurant icon.js";
import { useNavigate } from "react-router-dom";
import "./UserMidFormBasic.css";
import { useState } from "react";

const UserMidFormBasic = ({
  searchCategory,
  setSearchCategory,
  addressOne,
  setAddressOne,
  setAddressTwo,
  searchResponses,
  setSearchResponses,
  addressTwoManual,
  setAddressTwoManual,
  userDefaultAddress,
  setUserDefaultAddress,
  defaultFormView,
  setDefaultFormView,
  userName,
  userEmail,
  token,
  setSearchCenter,
  failedFetch,
  setFailedFetch,
}) => {
  const [errorMessageOneEmpty, setErrorMessageOneEmpty] = useState(false);
  const [errorMessageTwoEmpty, setErrorMessageTwoEmpty] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    setAddressOne("");
    setAddressTwo("");
    setSearchCategory("cafe");
  }, []);

  const addressOneHandler = (e) => {
    setAddressOne(e.target.value);
    if (addressOne) {
      setErrorMessageOneEmpty(false);
    }
  };

  const useDefaultAddress = (e) => {
    if (e.target.checked === true) {
      setAddressOne(userDefaultAddress);
    } else {
      setAddressOne("");
      e.target.checked = false;
    }
    if (addressOne) {
      setErrorMessageOneEmpty(false);
    }
  };

  const handleCurrentLocation = (e) => {
    if (e.target.checked === true) {
      navigator.geolocation.getCurrentPosition((position) => {
        var location =
          position.coords.latitude + "," + position.coords.longitude;
        getCurrentLocation(location).then((d) => {
          setAddressOne(
            d.results[0].locations[0].street +
              " " +
              d.results[0].locations[0].adminArea5 +
              " " +
              d.results[0].locations[0].adminArea3 +
              " " +
              d.results[0].locations[0].adminArea1
          );
        });
      });
    } else {
      setAddressOne("");
    }
  };

  const addressTwoHandlerManual = (e) => {
    setAddressTwoManual(e.target.value);
    setErrorMessageTwoEmpty(false);
  };

  const submitUserForm = (e) => {
    localStorage.clear();
    setErrorMessageOneEmpty(false);
    setErrorMessageTwoEmpty(false);
    setFailedFetch(false);
    e.preventDefault();
    if (addressTwoManual && addressOne) {
      localStorage.setItem("addressOne", JSON.stringify(addressOne));
      localStorage.setItem(
        "addressTwoManual",
        JSON.stringify(addressTwoManual)
      );
      getLocations(addressOne, addressTwoManual, searchCategory)
        .then((data) => {
          setSearchResponses(data.data.attributes.locations);
          setSearchCenter(data.data.attributes.map_argument.map_center);
          localStorage.setItem(
            "searchResponses",
            JSON.stringify(data.data.attributes.locations)
          );
          localStorage.setItem(
            "searchCenter",
            JSON.stringify(data.data.attributes.map_argument.map_center)
          );
          localStorage.setItem(
            "searchCategory",
            JSON.stringify(searchCategory)
          );
          setErrorMessageOneEmpty(false);
          setErrorMessageTwoEmpty(false);
          setFailedFetch(false);
        })
        .then((data) => navigate(`/results`))
        .catch((data) => {
          setFailedFetch(true);
          return null;
        });
    }
    if (!addressOne) {
      setErrorMessageOneEmpty(true);
    }
    if (!addressTwoManual) {
      setErrorMessageTwoEmpty(true);
    }
  };

  return (
    <section className='user-mid'>
      <h2>Find a place in the middle.</h2>
      <form>
        <p>
          <b>Your</b> starting point is...
        </p>
        <div className='checkbox-option-container'>
          <div className='checkbox-div'>
            <input
              id='checkbox'
              type='radio'
              name='checkbox'
              onChange={useDefaultAddress}
            />
            <label className='checkbox-address'> 🏠 Use default address </label>
          </div>
          <div className='checkbox-div'>
            <input
              id='checkbox'
              type='radio'
              name='checkbox'
              onChange={handleCurrentLocation}
            />
            <label className='checkbox-address'>📍 Use current location </label>
          </div>
        </div>
        <p className='address-instructions'>
          Or enter a complete address, a city + state, or a zip
        </p>
        {errorMessageOneEmpty && (
          <p className='error-message'>Please provide the required input.</p>
        )}
        <input
          className='address-input'
          type='text'
          placeholder='123 Your Street'
          value={addressOne}
          onChange={addressOneHandler}
        ></input>
        <p className='second-address-label'>
          <b>Other</b> party's starting point is...
        </p>
        <p className='address-instructions'>
          Enter a complete address, a city + state, or a zip
        </p>
        {errorMessageTwoEmpty && (
          <p className='error-message'>Please provide the required input.</p>
        )}
        <input
          className='address-input'
          type='text'
          placeholder='456 Their Street'
          value={addressTwoManual}
          onChange={addressTwoHandlerManual}
        ></input>
        <p className='icon-label'>Meet at a...</p>
        <div className='category-icons'>
          <CafeIcon
            setSearchCategory={setSearchCategory}
            searchCategory={searchCategory}
          />
          <RestaurantIcon
            setSearchCategory={setSearchCategory}
            searchCategory={searchCategory}
          />
          <BarIcon
            setSearchCategory={setSearchCategory}
            searchCategory={searchCategory}
          />
          <LibraryIcon
            setSearchCategory={setSearchCategory}
            searchCategory={searchCategory}
          />
          <ParkIcon
            setSearchCategory={setSearchCategory}
            searchCategory={searchCategory}
          />
        </div>
        <button className='search-button' onClick={submitUserForm}>
          <strong>Search the Middle</strong>
        </button>
        {failedFetch && (
          <p className='failed-fetch-error'>
            Oh no! There are no results for this search, please try other
            locations.
          </p>
        )}
      </form>
    </section>
  );
};

export default UserMidFormBasic;
