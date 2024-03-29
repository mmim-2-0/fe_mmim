import { GoogleLogin } from "react-google-login";
import { getUser, getUserMeetings } from "../apiCalls.js";
import "./login.css";

const clientId =
  "514096567087-on7cssmi56nj26j0dbf1gnaakv3o5gq4.apps.googleusercontent.com";

const Login = ({
  shouldHide,
  userEmail,
  setUserEmail,
  userName,
  setUserName,
  token,
  setToken,
  setUserDefaultAddress,
  setUserId,
  userId,
  userMeetings,
  setUserMeetings,
}) => {
  const onSuccess = (res) => {
    getUser(res.profileObj.givenName, res.profileObj.email).then((data) => {
      setUserEmail(res.profileObj.email);
      setUserName(res.profileObj.givenName);
      setToken(data.data.attributes.token);
      localStorage.setItem("token", JSON.stringify(data.data.attributes.token));
      setUserDefaultAddress(data.data.attributes.address);
      setUserId(data.data.id);
      localStorage.setItem("userEmail", JSON.stringify(res.profileObj.email));
      localStorage.setItem(
        "userName",
        JSON.stringify(res.profileObj.givenName)
      );
      localStorage.setItem("userId", JSON.stringify(data.data.id));
      localStorage.setItem(
        "userDefaultAddress",
        JSON.stringify(data.data.attributes.address)
      );
      getUserMeetings(data.data.id, data.data.attributes.token).then(
        (response) => setUserMeetings(response.data)
      );
    });
  };

  const onFailure = (res) => {
    console.log("login failed! res:", res);
  };

  return (
    <div id='signInButton' style={{ opacity: shouldHide ? 0 : 1 }}>
      <GoogleLogin
        className='login'
        clientId={clientId}
        buttonText='Continue with Google'
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
};

export default Login;
