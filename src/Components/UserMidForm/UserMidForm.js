import React, { useRef, useEffect, useState } from "react";
import {
  getLocations,
  getGuestUser,
  getCurrentLocation,
} from "../../apiCalls.js";
import { useNavigate } from "react-router-dom";
import { InputBox } from "./InputBox.js";
import { IconRow } from "./IconRow.js";
import { CheckboxRow } from "./CheckboxRow.js";
import "./UserMidForm.css";

const InputError = Object.freeze({
  InputNeeded: "inputNeeded",
  InputInvalid: "inputInvalid",
  EmailInvalid: "emailInvalid",
  EmailNotFound: "emailNotFound",
  SameEmail: "sameEmail",
});

const getInputErrorText = (inputError) => {
  const inputErrorText = Object.freeze({
    [InputError.InputNeeded]: "Please provide the required input.",
    [InputError.InputInvalid]: "Invalid address- please use a different address.",
    [InputError.EmailInvalid]: "Invalid email address- please try another email.",
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
      ? `No results found for category ${category} - please refine the addresses or search category.`
      : "No results found for category - please refine the addresses or search category.",
  });

  return formErrorText[formError];
};

const FormErrorTextComponent = ({ formError, searchCategory }) => (
  <p className="form-error-message">
    {getFormErrorText(formError, searchCategory)}
  </p>
);

export const FormType = Object.freeze({
  Basic: "basic",
  Meeting: "meeting",
});

export const UserMidForm = ({
  formType,
  searchCategory,
  setSearchCategory,
  addressOne,
  setAddressOne,
  setAddressTwo,
  searchResponses,
  setSearchResponses,
  addressTwoEmail,
  setAddressTwoEmail,
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
  const [formError, setFormError] = useState();
  const [numSearches, setNumSearches] = useState(0);
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
          var value = `${d.results[0].locations[0].street} ${d.results[0].locations[0].adminArea5} ${d.results[0].locations[0].adminArea3} ${d.results[0].locations[0].adminArea1}`
          addressOneHandler(value)
          ref.current.setValue(value)
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

  const addressTwoHandlerManual = (value) => {
    setAddressTwoManual(value);
    setInputTwoError();
  };

  const addressTwo =
    formType === FormType.Meeting ? addressTwoEmail : addressTwoManual;

  const addressTwoHandler =
    formType === FormType.Meeting
      ? addressTwoHandlerEmail
      : addressTwoHandlerManual;

  const submitUserForm = (e) => {
    localStorage.clear();
    setInputOneError();
    setInputTwoError();
    setFormError();
    setFailedFetch(false);
    setNumSearches(numSearches + 1);

    e.preventDefault();
    if (addressTwo && addressOne) {
      localStorage.setItem("addressOne", JSON.stringify(addressOne));
      localStorage.setItem(
        formType === FormType.Meeting ? "addressTwoEmail" : "addressTwoManual",
        JSON.stringify(addressTwo)
      );

      const getGetLocations = async () => {
        let address;
        if (formType === FormType.Meeting) {
          try {
            const { data } = await getGuestUser(token, addressTwoEmail);
            address = data.attributes.address;
          } catch {
            setInputTwoError(InputError.EmailNotFound);
          }
        } else {
          address = addressTwoManual;
        }

        return getLocations(addressOne, address, searchCategory);
      };
      getGetLocations()
        .then((data) => {
          if (data.data.attributes) {
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
            setInputTwoError(InputError.EmailInvalid)
          }
          if (data.data.error.invalid_search){
            setFailedFetch(true);
            setFormError(FormError.NoResults);
          }
        });
      } else {
        if (!addressOne) {
          setInputOneError(InputError.InputNeeded);
        }
        if (!addressTwo) {
          setInputTwoError(InputError.InputNeeded);
        }
      }
    };

  return (
    <section className="user-mid">
      {formType === FormType.Meeting ? (
        <>
          <h2>Meet another MiMMer.</h2>
          <h3 className="subheading">Suggest a time and place.</h3>
        </>
      ) : (
        <h2>Find a place in the middle.</h2>
      )}
      <form>
        <p>
          <b>Your</b> starting point is...
        </p>
        <CheckboxRow
          useDefaultAddress={useDefaultAddress}
          handleCurrentLocation={handleCurrentLocation}
        />
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
          {formType === FormType.Meeting ? (
            <>
              <b>Meet</b> with...
            </>
          ) : (
            <>
              <b>Other</b> party's starting point is...
            </>
          )}
        </p>
        <InputBox
          labelClass="address-instructions"
          labelText={
            formType === FormType.Meeting
              ? "Enter other party's email address"
              : "Enter a complete address, a city + state, or a zip"
          }
          placeholder={
            formType === FormType.Meeting
              ? "YourFriend@example.com"
              : "456 Their Street"
          }
          inputClass="address-input"
          onChange={addressTwoHandler}
          errorClass="input-error-message"
          errorText={getInputErrorText(inputTwoError)}
        />
        <p className="icon-label">Meet at a...</p>
        <IconRow
          searchCategory={searchCategory}
          setSearchCategory={_setSearchCategory}
        />
        <button className="search-button" onClick={submitUserForm}>
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
