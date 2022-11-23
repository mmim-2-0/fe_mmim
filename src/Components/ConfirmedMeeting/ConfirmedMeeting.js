import React from "react";
import { patchMeeting, getUserMeetings } from "../../apiCalls";
import "./ConfirmedMeeting.css";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";

const ConfirmedMeeting = ({
  meetingInfo,
  userId,
  token,
  setUserMeetings,
  toggleRerender,
  setToggleRerender,
}) => {
  const localizedFormat = require("dayjs/plugin/localizedFormat");
  dayjs.extend(localizedFormat);
  dayjs.extend(utc);
  dayjs.extend(tz);
  const timeZone = dayjs.tz.guess();
  const { format } = require("date-fns");

  // console.log(dayjs.utc("2022-11-11T11:11:00").tz("America/Denver"))
  // console.log(dayjs.tz.guess())
  // const today = format(new Date(),'dd.MM.yyyy HH:mm:ss');

  // console.log(day.js)

  const cancelMeetingInvite = (e) => {
    patchMeeting(
      "cancelled",
      userId,
      meetingInfo.id,
      token,
      meetingInfo.attributes.locations[0].id
    )
      .then(
        getUserMeetings(userId, token).then((response) =>
          setUserMeetings(response.data)
        )
      )
      .then(() => {
        setToggleRerender(!toggleRerender);
      });
  };

  const displayLocationOptions = (array) => {
    return array.map((location, index) => (
      <div key={index}>
        <p>{location.name}</p>
        <p>{location.address}</p>
      </div>
    ));
  };

  // console.log(dayjs.tz(meetingInfo.attributes.time, timeZone)["$x"]["$timezone"])

  return (
    <div className='individual-confirmed-meeting'>
      <div>
        <p className='individual-meeting-title'>
          <strong>
            {meetingInfo.attributes.host_name}'s meeting with{" "}
            {meetingInfo.attributes.guest_name}
          </strong>
        </p>
        <p>
          <strong>Time: </strong>
          {dayjs(meetingInfo.attributes.time).format("LLL")}
        </p>
        {displayLocationOptions(meetingInfo.attributes.locations)}
      </div>
      <button className='cancel-button' onClick={(e) => cancelMeetingInvite(e)}>
        Cancel Meeting
      </button>
    </div>
  );
};

export default ConfirmedMeeting;
