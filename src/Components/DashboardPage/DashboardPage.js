import PendingMeetings from "../PendingMeetings/PendingMeetings";

const DashboardPage = ({ userMeetings, userId, token }) => {
  return (
    <div>
    {(userMeetings.length > 0) && <PendingMeetings 
      userMeetings={userMeetings}
      userId={userId}
      token={token}
    />}
    </div>
  )
}

export default DashboardPage;