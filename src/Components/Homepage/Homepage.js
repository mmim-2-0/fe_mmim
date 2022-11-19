import React from "react";
import { useEffect, useState } from "react";
import DefaultMidForm from "../DefaultMidForm/DefaultMidForm";
import UserMidFormBasic from "../UserMidFormBasic/UserMidFormBasic";
import UserMidFormMeeting from "../UserMidFormMeeting/UserMidFormMeeting";
import "./Homepage.css";

const Homepage = ({
  token,
  userEmail,
  userName,
  userId,
  searchCategory,
  setSearchCategory,
  addressOne,
  setAddressOne,
  addressTwo,
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
  searchCenter,
  setSearchCenter,
  userMeetings,
  setPageTitle,
  setCheckedMeetingLocations,
}) => {
  const [failedFetch, setFailedFetch] = useState(false);

  const [currentDisplay, setCurrentDisplay] = useState("Basic Search");

  const tab1 = document.getElementById("tab-1");
  const tab2 = document.getElementById("tab-2");

  const handleHomepageDisplay = (display, focusTab, unfocusTab) => {
    focusTab.style.backgroundColor = "dimgray";
    unfocusTab.style.backgroundColor = "silver";
    setCurrentDisplay(display);
  };

  useEffect(() => {
    setPageTitle("home");
    setAddressTwoEmail("");
    setAddressTwoManual("");
    setCheckedMeetingLocations([]);
  }, []);

  return (
    <div>
      <section>
        <div className="homepage">
          <div
            className="homepageImage"
            alt="An aerial view of a city in gold and black, so distant it looks like a collection of fine copper wire and fairy lights against an ebony backdrop."
          >
            <div className="overlay-text">
              <header className="overlay-h">Meet Me in the Middle</header>
              <div>
                <p className="overlay-p">
                  Whether you’re meeting a friend or buying a bike, Meet Me in
                  the Middle makes it easy.
                </p>
                <p className="overlay-p">
                  Use MMiM to find the right place between your two locations.
                </p>
              </div>
            </div>
          </div>
          {!userEmail ? (
            <DefaultMidForm
              searchCategory={searchCategory}
              setSearchCategory={setSearchCategory}
              addressOne={addressOne}
              setAddressOne={setAddressOne}
              addressTwo={addressTwo}
              setAddressTwo={setAddressTwo}
              searchResponses={searchResponses}
              setSearchResponses={setSearchResponses}
              searchCenter={searchCenter}
              setSearchCenter={setSearchCenter}
              failedFetch={failedFetch}
              setFailedFetch={setFailedFetch}
            />
          ) : (
            <div style={{ flex: 1, maxWidth: "50%" }}>
              <button
                className="tab"
                id="tab-1"
                onClick={() =>
                  handleHomepageDisplay("Basic Search", tab1, tab2)
                }
              >
                Search the middle
              </button>
              <button
                className="tab"
                id="tab-2"
                onClick={() =>
                  handleHomepageDisplay("Meeting Search", tab2, tab1)
                }
              >
                Suggest a meeting
              </button>
              {currentDisplay === "Basic Search" ? (
                <UserMidFormBasic
                  userName={userName}
                  userEmail={userEmail}
                  token={token}
                  searchCategory={searchCategory}
                  setSearchCategory={setSearchCategory}
                  addressOne={addressOne}
                  setAddressOne={setAddressOne}
                  addressTwo={addressTwo}
                  setAddressTwo={setAddressTwo}
                  searchResponses={searchResponses}
                  setSearchResponses={setSearchResponses}
                  addressTwoManual={addressTwoManual}
                  setAddressTwoManual={setAddressTwoManual}
                  userDefaultAddress={userDefaultAddress}
                  setUserDefaultAddress={setUserDefaultAddress}
                  defaultFormView={defaultFormView}
                  setDefaultFormView={setDefaultFormView}
                  searchCenter={searchCenter}
                  setSearchCenter={setSearchCenter}
                  failedFetch={failedFetch}
                  setFailedFetch={setFailedFetch}
                />
              ) : (
                <UserMidFormMeeting
                  userName={userName}
                  userEmail={userEmail}
                  token={token}
                  searchCategory={searchCategory}
                  setSearchCategory={setSearchCategory}
                  addressOne={addressOne}
                  setAddressOne={setAddressOne}
                  addressTwo={addressTwo}
                  setAddressTwo={setAddressTwo}
                  searchResponses={searchResponses}
                  setSearchResponses={setSearchResponses}
                  addressTwoEmail={addressTwoEmail}
                  setAddressTwoEmail={setAddressTwoEmail}
                  addressTwoManual={addressTwoManual}
                  setAddressTwoManual={setAddressTwoManual}
                  userDefaultAddress={userDefaultAddress}
                  setUserDefaultAddress={setUserDefaultAddress}
                  defaultFormView={defaultFormView}
                  setDefaultFormView={setDefaultFormView}
                  searchCenter={searchCenter}
                  setSearchCenter={setSearchCenter}
                  failedFetch={failedFetch}
                  setFailedFetch={setFailedFetch}
                />
              )}
            </div>
          )}
          <div className="why-login">
            <div className="why-login-text">
              <h2 className="login-header">Simplify your</h2>
              <h2 className="login-header">planning.</h2>
              <h2 className="login-header">Protect your</h2>
              <h2 className="login-header">privacy.</h2>
              <p className="login-p first-p">
                When you login to MMIM, you can save a default address.
              </p>
              <p className="login-p">
                This allows you to suggest meeting places to others without
                needing to know their address, or share yours.
              </p>
              <p className="login-p">
                It's simple and keeps your info private-perfect for local sales
                and first dates.
              </p>
            </div>
            <div className="why-login-image" alt="hand holding a phone"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
