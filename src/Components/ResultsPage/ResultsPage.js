import React from "react";
import { useEffect, useState } from "react";
import Map from "../Map/Map";
import BarIcon from "../../assets/Bar icon.js";
import CafeIcon from "../../assets/Cafe icon.js";
import LibraryIcon from "../../assets/Library icon.js";
import ParkIcon from "../../assets/Park icon.js";
import RestaurantIcon from "../../assets/Restaurant icon.js";
import {
  getLocations,
  getGuestUser,
  sendMeetingOptions,
} from "../../apiCalls.js";
import ResultsContainer from "../ResultsContainer/ResultsContainer";
import Time from "../Time/Time";
import "./ResultsPage.css";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useAddresses } from "./useAddresses"

const ResultsPage = ({
  searchCategory,
  setSearchCategory,
  setSearchResponses,
  searchResponses,
  setSearchCenter,
  searchCenter,
  addressOne:globalAddressOne,
  addressTwo:globalAddressTwo,
  addressTwoManual,
  checkedMeetingLocations,
  setCheckedMeetingLocations,
  userEmail,
  token,
  userId,
  addressTwoEmail,
  setPageTitle,
}) => {
  const {addressOne, addressTwo} = useAddresses(globalAddressOne, globalAddressTwo)
  const [meetingTime, setMeetingTime] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [retrievedAddressOne, setRetrievedAddressOne] = useState(
    localStorage.getItem("addressOne")
  );
  const [retrievedAddressTwo, setRetrievedAddressTwo] = useState(
    localStorage.getItem("addressTwo")
  );
  const [retrievedAddressTwoManual, setRetrievedAddressTwoManual] = useState(
    localStorage.getItem("addressTwoManual")
  );
  const [retrievedAddressTwoEmail, setRetrievedAddressTwoEmail] = useState(
    localStorage.getItem("addressTwoEmail")
  );
  const [retrievedSearchResponses, setRetrievedSearchResponses] = useState(
    localStorage.getItem("searchResponses")
  );
  const [retrievedSearchCenter, setRetrievedSearchCenter] = useState(
    localStorage.getItem("searchCenter")
  );
  const [retrievedSearchCategory, setRetrievedSearchCategory] = useState(
    localStorage.getItem("searchCategory")
  );

  let navigate = useNavigate();

  useEffect(() => {
    setPageTitle("home");
  });

  let updateCategory = (category) => {
    setSearchCategory(category);
    if (retrievedAddressTwo || retrievedAddressTwoManual) {
      console.log("retrievedAddressTwo", retrievedAddressTwo);
      console.log("retrievedAddressOne", retrievedAddressOne);
      console.log("retrievedAddressTwoManual", retrievedAddressTwoManual);

      getLocations(
        retrievedAddressOne,
        retrievedAddressTwo || retrievedAddressTwoManual,
        category
      )
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
          localStorage.setItem("searchCategory", JSON.stringify(category));
        })
        .then(() => {
          setRetrievedSearchResponses(localStorage.getItem("searchResponses"));
          setRetrievedSearchCenter(localStorage.getItem("searchCenter"));
        });
    }
    if (retrievedAddressTwoEmail) {
      getGuestUser(token, JSON.parse(retrievedAddressTwoEmail))
        .then((data) => {
          return data.data.attributes.address;
        })
        .then((address) => {
          getLocations(retrievedAddressOne, address, category)
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
              localStorage.setItem("searchCategory", JSON.stringify(category));
            })
            .then(() => {
              setRetrievedSearchResponses(
                localStorage.getItem("searchResponses")
              );
              setRetrievedSearchCenter(localStorage.getItem("searchCenter"));
            });
        });
    }
  };

  // const handleTimeInput = (e) => {
  //   // console.log(e.target.value)
  //   setMeetingTime(e.target.value)
  // };

  const postMeetingLocations = () => {
    if (checkedMeetingLocations.length && meetingTime) {
      console.log(userId, "userId");
      console.log(token, "token");
      console.log(retrievedAddressTwoEmail, "retrievedAddressTwoEmail");
      console.log(meetingTime, "meetingTime");

      sendMeetingOptions(
        userId,
        token,
        JSON.parse(retrievedAddressTwoEmail),
        meetingTime,
        checkedMeetingLocations
      ).then((res) => console.log(res));
      setCheckedMeetingLocations([]);
      navigate(`/dashboard`);
      setPageTitle("dashboard");
      setErrorMessage(false);
    } else {
      setErrorMessage(true);
    }
  };

  // sendMeetingOptions(userId, token, addressTwoEmail, "November 11, 2022 11:11:00 GMT-0700", checkedMeetingLocations).then(res => console.log(res))
  // console.log(dayjs(new Date()).format('YYYY-MM-DD'))
  // console.log("retrievedSearchResponses", retrievedSearchResponses)

console.log(addressOne)
console.log(addressTwo)

  return (
    <div>
      <div className='category-change-container'>
        <h1 className='category-text'>Find a meeting location.</h1>
        <div className='category-container'>
          <CafeIcon
            setSearchCategory={updateCategory}
            searchCategory={searchCategory}
          />
          <RestaurantIcon
            setSearchCategory={updateCategory}
            searchCategory={searchCategory}
          />
          <BarIcon
            setSearchCategory={updateCategory}
            searchCategory={searchCategory}
          />
          <LibraryIcon
            setSearchCategory={updateCategory}
            searchCategory={searchCategory}
          />
          <ParkIcon
            setSearchCategory={updateCategory}
            searchCategory={searchCategory}
          />
        </div>
      </div>
      <div className='map-and-results'>
        <div className='map'>
          <Map
            searchResponses={JSON.parse(retrievedSearchResponses)}
            searchCenter={JSON.parse(retrievedSearchCenter)}
          />
        </div>
        <div className='title-and-results'>
          <h2 className='results-title'>Results:</h2>
          {addressOne && addressTwo &&(
          <div className="address-text-column">
              <div className='address-text'>Address 1:  {addressOne.replace('"', ' ').replace('"', ' ')}</div>
              <div className='address-text'>Address 2: {addressTwo.replace('"', ' ').replace('"', ' ')}</div>
          </div>
          )}
          {retrievedAddressTwoEmail && (
            <p className='email-instructions'>
              Select up to three locations to send{" "}
              <strong>{JSON.parse(retrievedAddressTwoEmail)}</strong>
            </p>
          )}
          <div className='results'>
            <ResultsContainer
              searchResponses={JSON.parse(retrievedSearchResponses)}
              addressOne={addressOne}
              addressTwo={addressTwo}
              addressTwoManual={addressTwoManual}
              checkedMeetingLocations={checkedMeetingLocations}
              setCheckedMeetingLocations={setCheckedMeetingLocations}
              userEmail={userEmail}
              token={token}
              userId={userId}
              addressTwoEmail={retrievedAddressTwoEmail}
              setPageTitle={setPageTitle}
            />
          </div>
          {retrievedAddressTwoEmail ? (
            <div className='meeting-invite-container'>
              <p className='meeting-invitation-instructions'>
                Select a date / time and enter the other party's email for your
                meeting invitation:
              </p>
              <Time meetingTime={meetingTime} setMeetingTime={setMeetingTime} />
              <button
                className='invitation-button'
                onClick={postMeetingLocations}
              >
                Send Meeting Invitation
              </button>
            </div>
          ) : (
            <p className='login-text'>
              Login to send a friend a meeting invite
            </p>
          )}
          {errorMessage && (
            <p className='error-message'>
              Please provide at least one possible meeting location to send an
              invitation.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
