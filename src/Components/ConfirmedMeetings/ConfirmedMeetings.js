import React from "react";
import ConfirmedMeeting from "../ConfirmedMeeting/ConfirmedMeeting";
import "./ConfirmedMeetings.css";
import { useState, useEffect } from "react";
import { getUserMeetings } from "../../apiCalls";

const ConfirmedMeetings = ({
  userMeetings,
  userId,
  token,
  setUserMeetings,
  currentDisplay,
}) => {
  const [userConfirmedMeetings, setUserConfirmedMeetings] = useState([]);
  const [toggleRerender, setToggleRerender] = useState(false);

  useEffect(() => {
    getUserMeetings(userId, token).then((response) => {
      console.log("userId", userId);
      console.log("token", token);
      let allMeetings = [];
      response.data.forEach((m) => {
        if (m.attributes.status === "accepted") {
          allMeetings.push(m);
        }
      });
      let filteredMeetings = [];
      allMeetings.forEach((m) => {
        let allIds = filteredMeetings.reduce((acc, i) => {
          acc.push(i.id);
          return acc;
        }, []);
        if (!allIds.includes(m.id)) {
          filteredMeetings.push(m);
        }
      });
      setUserConfirmedMeetings(filteredMeetings);
      setUserMeetings(response.data);
    });
  }, [toggleRerender]);

  const displayConfirmedMeetings = userConfirmedMeetings.map(
    (meeting, index) => {
      return (
        <ConfirmedMeeting
          userId={userId}
          meetingInfo={meeting}
          token={token}
          setUserMeetings={setUserMeetings}
          key={index}
          toggleRerender={toggleRerender}
          setToggleRerender={setToggleRerender}
        />
      );
    }
  );

  return (
    <div className="all-confirmed-and-title">
      <h2 className="confirmed-title">Confirmed meetings:</h2>
      <div className="all-confirmed">
        {userConfirmedMeetings.length > 0 ? (
          displayConfirmedMeetings
        ) : (
          <p className="no-meeting-notification">
            You have no confirmed meetings at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default ConfirmedMeetings;
