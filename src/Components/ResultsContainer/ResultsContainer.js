import React from "react";
import Result from "../Result/Result";
import "./ResultsContainer.css";

const ResultsContainer = ({
  searchResponses,
  checkedMeetingLocations,
  setCheckedMeetingLocations,
  token,
  userId,
  addressTwoEmail,
  setPageTitle,
}) => {
  let displayedResults = searchResponses.map((response, index) => {
    return (
      <Result
        info={response}
        id={index}
        key={response.url}
        checkedMeetingLocations={checkedMeetingLocations}
        setCheckedMeetingLocations={setCheckedMeetingLocations}
        searchResponses={searchResponses}
        addressTwoEmail={addressTwoEmail}
      />
    );
  });

  return <div>{displayedResults}</div>;
};

export default ResultsContainer;
