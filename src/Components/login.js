import { GoogleLogin } from 'react-google-login'
import  { getUser } from '../apiCalls.js'

const clientId = "1043160436627-t0siob1vmac373h292mh0dohemkjrr5m.apps.googleusercontent.com"

const Login = ({ userEmail, setUserEmail, userName, setUserName, token, setToken }) => {
    const onSuccess = (res) => {
        // console.log("this is res",res)
        console.log('Login success! current user:', res.profileObj)
        getUser(res.profileObj.givenName, res.profileObj.email).then(data => {
            setUserEmail(res.profileObj.email)
            setUserName(res.profileObj.givenName)
            setToken(data.data.attributes.token)
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