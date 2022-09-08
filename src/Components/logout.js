import { GoogleLogout  } from "react-google-login";
import  { logoutUser } from '../apiCalls.js'

const clientId = "1043160436627-t0siob1vmac373h292mh0dohemkjrr5m.apps.googleusercontent.com"

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