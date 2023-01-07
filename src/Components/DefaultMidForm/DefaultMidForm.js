import React, { useRef, useEffect, useState } from "react";
import { getLocations, getCurrentLocation } from "../../apiCalls.js";
import MarkerIcon from "../../assets/Marker icon.js";
import { InputBox } from "./InputBox.js";
import { IconRow } from "./IconRow.js";
import { useNavigate } from "react-router-dom";
import "./DefaultMidForm.css";

const InputError = Object.freeze({
  InputNeeded: "inputNeeded",
  InputInvalid: "inputInvalid",
});

const getInputErrorText = (inputError) => {
  const inputErrorText = Object.freeze({
    [InputError.InputNeeded]: "Please provide the required input.",
    [InputError.InputInvalid]: "Invalid address- please use a different address."
  });

  return inputErrorText[inputError];
};

const FormError = Object.freeze({
  NoResults: "noResults",
});

const getFormErrorText = (formError, category) => {
  const formErrorText = Object.freeze({
    [FormError.NoResults]: category
      ? `No results found for category ${category}`
      : "No results found for category",
  });

  return formErrorText[formError];
};

const FormErrorTextComponent = ({formError, searchCategory}) => (
    <p className="form-error-message">
      {getFormErrorText(formError, searchCategory)}
    </p>
);

export const DefaultMidForm = ({
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
  const [formError, setFormError] = useState();
  const [numSearches, setNumSearches] = useState(0);
  const [inputOneError, setInputOneError] = useState();
  const [inputTwoError, setInputTwoError] = useState();
  const [key, setKey] = useState(0);
  const [unselectMarker, setUnselectMarker] = useState(false);
  const ref = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    setAddressOne("");
    setAddressTwo("");
    setSearchCategory("cafe");
  }, []);

  const addressOneHandler = (value, isCurrentLocation=false) => {
    setAddressOne(value);
    setInputOneError();
    if (unselectMarker === false && !isCurrentLocation){
      setUnselectMarker(true);
    }
  };

  const handleCurrentLocation = () => {
    document.body.style.cursor = "wait";
    navigator.geolocation.getCurrentPosition((position) => {
      var location =
        position.coords.latitude + "," + position.coords.longitude;
      getCurrentLocation(location).then(d=> {
        var value = `${d.results[0].locations[0].street} ${d.results[0].locations[0].adminArea5} ${d.results[0].locations[0].adminArea3} ${d.results[0].locations[0].adminArea1}`
        addressOneHandler(value, true)
        ref.current.setValue(value)
        document.body.style.cursor = "";
      });
    });
    setInputOneError();
  };


  const _setSearchCategory = (category) =>{
    setFormError();
    setSearchCategory(category);
  }

  const addressTwoHandler = (value) => {
    setAddressTwo(value);
    setInputTwoError()
  };

  const submitDefaultForm = (e) => {
    localStorage.clear();
    setInputOneError();
    setInputTwoError()
    setFormError();
    setFailedFetch(false);
    setKey(key+1);
    setNumSearches(numSearches + 1);

    e.preventDefault();
    if (addressOne && addressTwo) {
      localStorage.setItem("addressOne", JSON.stringify(addressOne));
      localStorage.setItem("addressTwo", JSON.stringify(addressTwo));


      getLocations(addressOne, addressTwo, searchCategory)
      .then(data => {
       if (data.data.attributes) {
          setSearchResponses(data.data.attributes.locations);
          setSearchCenter(data.data.attributes.map_argument.map_center);
          localStorage.setItem('searchResponses', JSON.stringify(data.data.attributes.locations));
          localStorage.setItem('searchCenter', JSON.stringify(data.data.attributes.map_argument.map_center));
          localStorage.setItem('searchCategory', JSON.stringify(searchCategory));
          setFailedFetch(false)
          setInputOneError();
          setInputTwoError();
          navigate(`/results`)
        }
        else {
          return data
        }
      })
      .then(data => { 
        if (data.data.error.coord_1) {
          setInputOneError(InputError.InputInvalid)
        }
        if (data.data.error.coord_2){
          setInputTwoError(InputError.InputInvalid)
        }
        if (!data.data.error.coord_2 && !data.data.error.coord_1){
          setFailedFetch(true);
          setFormError(FormError.NoResults);
        }
      });
    } else {
      if (!addressOne) {
        setInputOneError(InputError.InputNeeded)
      }
      if(!addressTwo) {
        setInputTwoError(InputError.InputNeeded)
      }
    }
  };


  return (
    <section className="default-mid">
      <h2 className="default-title">Find a place in the middle.</h2>
      <form>
        <div className="row">
          <p className="starting-point">
            <b>Your</b> starting point is...
          </p>
          <div className="checkbox-div">
            <label className="checkbox-address">
              <div className="row-current-address">
                <MarkerIcon handleCurrentLocation={handleCurrentLocation} unselectMarker = {unselectMarker} setUnselectMarker= {setUnselectMarker}/>
                <p className="current-address-prompt">Use current location</p>
              </div>
            </label>
          </div>
        </div>
          <InputBox
            labelClass="address-instructions"
            labelText="Enter a complete address, a city + state, or a zip"
            inputClass="address-input"
            onChange={addressOneHandler}
            ref={ref}
          />
          <p className="input-error-message">
            {getInputErrorText(inputOneError)}
          </p>
        <p className="starting-point">
          <b>Other</b> party's starting point is...
        </p>
        <InputBox
          labelClass="address-instructions"
          labelText="Enter a complete address, a city + state, or a zip"
          inputClass="address-input"
          onChange={addressTwoHandler}
        />
        <p className="input-error-message">
          {getInputErrorText(inputTwoError)}
          </p>
        <p className="icon-label-default">Meet at a...</p>
        <IconRow
          searchCategory={searchCategory}
          setSearchCategory={_setSearchCategory}
        />
        <button className="search-button" onClick={submitDefaultForm}>
          <strong>Search the Middle</strong>
        </button>
          <FormErrorTextComponent
            formError={formError}
            searchCategory={numSearches > 1 ? searchCategory : undefined}
          />
      </form>
    </section>
  );
};