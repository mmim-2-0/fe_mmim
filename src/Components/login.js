import { GoogleLogin } from 'react-google-login'
import  { getUser } from '../apiCalls.js'

const clientId = "514096567087-on7cssmi56nj26j0dbf1gnaakv3o5gq4.apps.googleusercontent.com"

const Login = ({ userEmail, setUserEmail, userName, setUserName, token, setToken, setUserDefaultAddress }) => {
    const onSuccess = (res) => {
        // console.log("this is res",res)
        console.log('Login success! current user:', res.profileObj)
        getUser(res.profileObj.givenName, res.profileObj.email).then(data => {
            setUserEmail(res.profileObj.email)
            setUserName(res.profileObj.givenName)
            setToken(data.data.attributes.token)
            setUserDefaultAddress(data.data.attributes.address)
        })
    }

    const onFailure = (res) => {
        console.log('login failed! res:', res)
    }

    return (
        <div id='signInButton'>
            <GoogleLogin 
                clientId={clientId}
                buttonText='Login'
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}

export default Login