import PendingMeetings from "../PendingMeetings/PendingMeetings";
import ConfirmedMeetings from "../ConfirmedMeetings/ConfirmedMeetings";

const DashboardPage = ({ userMeetings, userId, token }) => {
  return (
    <div>
    {(userMeetings.length > 0) && <PendingMeetings 
      userMeetings={userMeetings}
      userId={userId}
      token={token}
    />}
    {(userMeetings.length > 0) && <ConfirmedMeetings 
      userMeetings={userMeetings}
      userId={userId}
      token={token}
    />}
    </div>
  )
}

export default DashboardPage;