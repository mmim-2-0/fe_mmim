import { GoogleLogout  } from "react-google-login";
import  { logoutUser } from '../apiCalls.js';
import './logout.css';
import { useNavigate } from 'react-router-dom';

const clientId = "514096567087-on7cssmi56nj26j0dbf1gnaakv3o5gq4.apps.googleusercontent.com"

const Logout = ({ userEmail, setUserEmail, userName, setUserName, token, setToken, setUserDefaultAddress, setUserId, setUserMeetings, setPageTitle }) => {

	let navigate = useNavigate();

	const onSuccess = () => {
		console.log('Logout successful!')
		logoutUser(token).then(data => {
			setUserEmail(null)
			setUserName(null)
			setToken(null)
			setUserDefaultAddress(null)
			setUserId(null)
			setUserMeetings([])
			navigate(`/`)
			setPageTitle('home')
		});
	};

	return (
		<div id="signOutButton">
			<GoogleLogout 
				className="logout"
				clientId={clientId}
				buttonText={'Logout of Google'}
				onLogoutSuccess={onSuccess}
			/>
		</div>
	)
};

export default Logout;