import React from "react";
import { getLocations, getCurrentLocation } from "../../apiCalls.js";
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
  const [defaultAddressChecked, setDefaultAddressChecked] = useState(false);

  useEffect(() => {
    setAddressOne("");
    setAddressTwo("");
    setSearchCategory("cafe");
  }, []);

  let navigate = useNavigate();

  const addressOneHandler = (e) => {
    setAddressOne(e.target.value);
  };

  const addressTwoHandler = (e) => {
    setAddressTwo(e.target.value);
  };

  const submitDefaultForm = (e) => {
    e.preventDefault();
    localStorage.clear();
    if (addressOne && addressTwo) {
      setErrorMessageOneEmpty(false);
      setErrorMessageTwoEmpty(false);
      localStorage.setItem("addressOne", JSON.stringify(addressOne));
      localStorage.setItem("addressTwo", JSON.stringify(addressTwo));
    }

    if (addressOne && addressTwo) {
      getLocations(addressOne, addressTwo, searchCategory)
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
          setFailedFetch(false);
        })
        .then((data) => navigate(`/results`))
        .catch((data) => setFailedFetch(true));
    }
    if (!addressOne) {
      setErrorMessageOneEmpty(true);
    }
    if (!addressTwo) {
      setErrorMessageTwoEmpty(true);
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
    setAddressOne("");
    setDefaultAddressChecked(false);
  };

  return (
    <section className="default-mid">
      <h2 className="default-title">Find a place in the middle.</h2>
      <form>

        <p className="starting-point">
          <b>Your</b> starting point is...
        </p>
       <div className="row">
  
        {errorMessageOneEmpty && (
          <p className="error-message">Please provide the required input.</p>
        )}
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
 

            {defaultAddressChecked &&
              (<button className="clear-button" onClick={resetCheckboxes}>
                <label className="checkbox-address-prompt">Clear</label>
               </button>)
            }
          </div>
        </div>


       </div>
        <p className="starting-point">
          <b>Other</b> party's starting point is...
        </p>
        {errorMessageTwoEmpty && (
          <p className="error-message">Please provide the required input.</p>
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
          <p className="failed-fetch-error">
            Oh no! There are no results for this search, please try other
            locations.
          </p>
        )}
      </form>
    </section>
  );
};

export default DefaultMidForm;
