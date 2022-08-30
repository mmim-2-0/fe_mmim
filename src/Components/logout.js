import { GoogleLogout  } from "react-google-login";

const clientId = "1043160436627-t0siob1vmac373h292mh0dohemkjrr5m.apps.googleusercontent.com"

const Logout = ({ userEmail, setUserEmail, userName, setUserName }) => {

    const onSuccess = () => {
        console.log('Logout successful!')
        setUserEmail(null)
        setUserName(null)
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