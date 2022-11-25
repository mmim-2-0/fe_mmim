import React from "react";
import { getLocations, getCurrentLocation } from "../../apiCalls.js";
import Expire from "../../assets/expire.js"
import BarIcon from "../../assets/Bar icon.js";
import CafeIcon from "../../assets/Cafe icon.js";
import LibraryIcon from "../../assets/Library icon.js";
import ParkIcon from "../../assets/Park icon.js";
import RestaurantIcon from "../../assets/Restaurant icon.js";
import MarkerIcon from "../../assets/Marker icon.js";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./DefaultMidForm.css";

const DefaultMidForm = ({
  searchCategory,
  setSearchCategory,
  addressOne,
  setAddressOne,
  addressTwo,
  setAddressTwo,
  setSearchResponses,
  setSearchCenter,
  failedFetch,
  setFailedFetch,
}) => {
  const [errorMessageOneEmpty, setErrorMessageOneEmpty] = useState(false);
  const [errorMessageTwoEmpty, setErrorMessageTwoEmpty] = useState(false);
  const [errorResponse, setErrorResponse]=useState('')
  const [errorMessageOneInvalid, setErrorMessageOneInvalid]=useState(false)
  const [errorMessageTwoInvalid, setErrorMessageTwoInvalid]=useState(false)
  const [defaultAddressChecked, setDefaultAddressChecked] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    setAddressOne("");
    setAddressTwo("");
    setSearchCategory("cafe");
  }, []);

  let navigate = useNavigate();

  const addressOneHandler = (e) => {
    setErrorMessageOneEmpty(false)
    setErrorMessageOneInvalid(false)
    unselectCheckboxes()
    setAddressOne(e.target.value);
  };

  const addressTwoHandler = (e) => {
    setErrorMessageTwoEmpty(false)
    setErrorMessageTwoInvalid(false)
    setAddressTwo(e.target.value);
  };

  const submitDefaultForm = (e) => {
    e.preventDefault();
    localStorage.clear();
    setKey(key+1)
    if (addressOne && addressTwo) {
      setErrorMessageOneEmpty(false);
      setErrorMessageTwoEmpty(false);
      localStorage.setItem("addressOne", JSON.stringify(addressOne));
      localStorage.setItem("addressTwo", JSON.stringify(addressTwo));
    }

    if (addressOne && addressTwo) {
        getLocations(addressOne, addressTwo, searchCategory)
        .then(data => {
         if (data.data.attributes) {
            setSearchResponses(data.data.attributes.locations)
            setSearchCenter(data.data.attributes.map_argument.map_center)
            localStorage.setItem('searchResponses', JSON.stringify(data.data.attributes.locations))
            localStorage.setItem('searchCenter', JSON.stringify(data.data.attributes.map_argument.map_center))
            localStorage.setItem('searchCategory', JSON.stringify(searchCategory))
            setFailedFetch(false)
            navigate(`/results`)
          }
          else {
            return data
          }
        })
        .then(data => { 
          console.log(data.data.error)
          if (data.data.error.coord_1) {
            setErrorMessageOneInvalid(true)
          }
          if (data.data.error.coord_2){
            setErrorMessageTwoInvalid(true)
          }
          if (!data.data.error.coord_2 && !data.data.error.coord_1){
          setFailedFetch(true)
        }
        })
      }

    if (!addressOne) {
      setErrorMessageOneEmpty(true)
    }
    if(!addressTwo) {
      setErrorMessageTwoEmpty(true)
    }
  };

  const checkDefaultAddress = () => {
  	setDefaultAddressChecked(true)
  }

  const handleCurrentLocation = () => {
  	  setDefaultAddressChecked(true);
      document.body.style.cursor = "wait";
      navigator.geolocation.getCurrentPosition(
        (position) => {
          var location =
            position.coords.latitude + "," + position.coords.longitude;
          getCurrentLocation(location).then((d) => {
            setErrorMessageOneEmpty(false)
            setErrorMessageOneInvalid(false)
            setAddressOne(
              d.results[0].locations[0].street +
                ", " +
                d.results[0].locations[0].adminArea5 +
                ", " +
                d.results[0].locations[0].adminArea3 +
                " " 
            );
          });

          document.body.style.cursor = "";},
        (positionError) => {
          document.body.style.cursor = "";
          setDefaultAddressChecked(true);

          switch (positionError.code) {
            case positionError.PERMISSION_DENIED:
            case positionError.POSITION_UNAVAILABLE:
            case positionError.TIMEOUT:
            default:
              // TODO: do something
              console.warn(positionError.message);
          }
        }
      );
  };

  const resetCheckboxes = () => {
    setErrorMessageOneEmpty(false)
    setErrorMessageOneInvalid(false)
    setAddressOne("");
    setDefaultAddressChecked(false);
  };

  const unselectCheckboxes = () => {
    setDefaultAddressChecked(false)
  }


  return (
    <section className="default-mid">
      <h2 className="default-title">Find a place in the middle.</h2>
      <form>

        <p className="starting-point">
          <b>Your</b> starting point is...
        </p>
        {errorMessageOneInvalid && (
          <Expire delay="1200" key={key}>
            <p className="error-message">Invalid address- please try again.</p>
          </Expire>
        )}
        {errorMessageOneEmpty && (
          <Expire delay="1200" key={key}>
            <p className="error-message">Please provide the required input.</p>
          </Expire>
        )}
       <div className="row">
        <input
          className="default-input"
          type="text"
          placeholder="123 Your Street, City, State OR Zip code"
          value={addressOne}
          onChange={addressOneHandler}
        ></input>
      <div className="checkbox-option-container">
          <div className="checkbox-div">
            <input
              id="checkbox"
              type="radio"
              name="checkbox"
              onChange={handleCurrentLocation}
              checked={defaultAddressChecked}
            />
            <label className="checkbox-address">
              <div className="row-current-address">
              	<MarkerIcon handleCurrentLocation={handleCurrentLocation} />
              	<p className="current-address-prompt">Use current location</p>
              </div>
            </label>
          </div>
        </div>


       </div>
        <p className="starting-point">
          <b>Other</b> party's starting point is...
        </p>
        {errorMessageTwoInvalid && (
          <Expire delay="1200" key={key}>
            <p className="error-message">Invalid address- please try again.</p>
          </Expire>
        )}
        {errorMessageTwoEmpty && (
          <Expire delay="1200" key={key}>
            <p className="error-message">Please provide the required input.</p>
          </Expire>

        )}
        <input
          className="default-input"
          type="text"
          placeholder="456 Their Street, City, State OR Zip code"
          onChange={addressTwoHandler}
        ></input>
        <p className="icon-label-default">Meet at a...</p>
        <div className="category-icons">
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
        <button className="search-button" onClick={submitDefaultForm}>
          <strong>Search the Middle</strong>
        </button>
        {failedFetch && (
          <Expire delay="1200" key={key}>
            <p className="failed-fetch-error">
              There are no results for this search, please try other
              locations.
            </p>
          </Expire>
        )}
      </form>
    </section>
  );
};

export default DefaultMidForm;
