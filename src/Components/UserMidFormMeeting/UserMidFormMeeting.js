import React, { useImperativeHandle, useRef } from "react";
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
import "./UserMidFormMeeting.css";
import { useState } from "react";

const InputError = Object.freeze({
  InputNeeded: "inputNeeded",
  EmailNotFound: "emailNotFound",
  SameEmail: "sameEmail",
});

const getInputErrorText = (inputError) => {
  const inputErrorText = Object.freeze({
    [InputError.InputNeeded]: "Please provide the required input.",
    [InputError.EmailNotFound]:
      "We can't find a user associated with this email, please try again.",
    [InputError.SameEmail]: "Hey! Don't use your own email here please.",
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

const FormErrorTextComponent = ({ formError, searchCategory }) => (
  <p className="form-error-message">
    {getFormErrorText(formError, searchCategory)}
  </p>
);

const InputBox = React.forwardRef(
  (
    {
      className,
      labelText,
      labelClass,
      labelStyle,
      inputClass,
      inputStyle,
      placeholder,
      errorText,
      errorClass,
      errorStyle,
      onSubmit,
      onChange,
    },
    ref
  ) => {
    const [value, setValue] = useState("");
    const _onChange = ({ target: { value } }) => {
      setValue(value);
      onChange?.(value);
    };

    useImperativeHandle(ref, () => ({
      setValue,
    }));
    return (
      <div className={className}>
        <p className={labelClass} style={labelStyle}>
          {labelText}
        </p>
        <input
          className={inputClass}
          style={inputStyle}
          type="text"
          placeholder={placeholder}
          value={value}
          onSubmit={onSubmit}
          onChange={_onChange}
        />
        <p className={errorClass} style={errorStyle}>
          {errorText}
        </p>
      </div>
    );
  }
);

const UserMidFormMeeting = ({
  searchCategory,
  setSearchCategory,
  addressOne,
  setAddressOne,
  setAddressTwo,
  searchResponses,
  setSearchResponses,
  addressTwoEmail,
  setAddressTwoEmail,
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
  const [formError, setFormError] = useState();
  const [inputOneError, setInputOneError] = useState();
  const [inputTwoError, setInputTwoError] = useState();
  const ref = useRef();
  const [currentLocation, setCurrentLocation] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setAddressOne("");
    setAddressTwo("");
    setSearchCategory("cafe");
  }, []);

  const addressOneHandler = (value) => {
    setAddressOne(value);
    if (value) {
      setInputOneError();
    }
  };

  const useDefaultAddress = (e) => {
    if (e.target.checked === true) {
      setAddressOne(userDefaultAddress);
      ref.current.setValue(userDefaultAddress ?? "");
      if (userDefaultAddress) {
        setInputOneError();
      }
    } else {
      setAddressOne("");
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

  const _setSearchCategory = (category) => {
    setFormError();
    setSearchCategory(category);
  };

  const addressTwoHandlerEmail = (value) => {
    setAddressTwoEmail(value);

    if (value === userEmail) {
      setInputTwoError(InputError.SameEmail);
      return;
    }
    setInputTwoError();
  };

  const submitUserForm = (e) => {
    localStorage.clear();
    setInputOneError();
    setInputTwoError();
    setFailedFetch(false);
    e.preventDefault();
    if (addressTwoEmail && addressOne) {
      localStorage.setItem("addressOne", JSON.stringify(addressOne));
      localStorage.setItem("addressTwoEmail", JSON.stringify(addressTwoEmail));
      getGuestUser(token, addressTwoEmail)
        .then((data) => {
          setInputOneError();
          setInputTwoError();
          getLocations(addressOne, data.data.attributes.address, searchCategory)
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
              setInputOneError();
              setInputTwoError();
              setFailedFetch(false);
            })
            .then((data) => navigate(`/results`))
            .catch((data) => {
              setFailedFetch(true);
              setFormError(FormError.NoResults);
            });
        })
        .catch((data) => {
          setInputTwoError(InputError.EmailNotFound);
        });
    } else {
      if (!addressOne) {
        setInputOneError(InputError.InputNeeded);
      }
      if (!addressTwoEmail) {
        setInputTwoError(InputError.InputNeeded);
      }
    }
  };

  return (
    <section className="user-mid">
      <h2>Meet another MiMMer.</h2>
      <h3 className="subheading">Suggest a time and place.</h3>
      <form>
        <p>
          <b>Your</b> starting point is...
        </p>
        <div className="checkbox-option-container">
          <div className="checkbox-div">
            <input
              id="checkbox"
              type="radio"
              name="checkbox"
              onChange={useDefaultAddress}
            />
            <label className="checkbox-address">🏠 Use default address</label>
          </div>
          <div className="checkbox-div">
            <input
              id="checkbox"
              type="radio"
              name="checkbox"
              onChange={handleCurrentLocation}
            />
            <label className="checkbox-address">📍 Use current location</label>
          </div>
        </div>
        <InputBox
          labelClass="address-instructions"
          labelText="Or enter a complete address, a city + state, or a zip"
          placeholder="123 Your Street"
          inputClass="address-input"
          onChange={addressOneHandler}
          errorClass="input-error-message"
          errorText={getInputErrorText(inputOneError)}
          ref={ref}
        />
        <p className="second-address-label">
          <b>Meet</b> with...
        </p>
        <InputBox
          labelClass="address-instructions"
          labelText="Enter other party's email address"
          placeholder="YourFriend@example.com"
          inputClass="address-input"
          onChange={addressTwoHandlerEmail}
          errorClass="input-error-message"
          errorText={getInputErrorText(inputTwoError)}
        />
        <p className="icon-label">Meet at a...</p>
        <div className="category-icons">
          <CafeIcon
            setSearchCategory={_setSearchCategory}
            searchCategory={searchCategory}
          />
          <RestaurantIcon
            setSearchCategory={_setSearchCategory}
            searchCategory={searchCategory}
          />
          <BarIcon
            setSearchCategory={_setSearchCategory}
            searchCategory={searchCategory}
          />
          <LibraryIcon
            setSearchCategory={_setSearchCategory}
            searchCategory={searchCategory}
          />
          <ParkIcon
            setSearchCategory={_setSearchCategory}
            searchCategory={searchCategory}
          />
        </div>
        <button className="search-button" onClick={submitUserForm}>
          <strong>Search the Middle</strong>
        </button>
        <FormErrorTextComponent
          formError={formError}
          searchCategory={searchCategory}
        />
      </form>
    </section>
  );
};

export default UserMidFormMeeting;
