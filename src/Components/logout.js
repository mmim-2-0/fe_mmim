import { GoogleLogout  } from "react-google-login";
import  { logoutUser } from '../apiCalls.js'

const clientId = "514096567087-on7cssmi56nj26j0dbf1gnaakv3o5gq4.apps.googleusercontent.com"

const Logout = ({ userEmail, setUserEmail, userName, setUserName, token, setToken }) => {

    const onSuccess = () => {
        console.log('Logout successful!')
        logoutUser(token).then(data => {
            setUserEmail(null)
            setUserName(null)
            setToken(null)
        })
        
    }

    return (
        <div id="signOutButton">
            <GoogleLogout 
                clientId={clientId}
                buttonText={'Logout'}
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}

export default Logout