import { GoogleLogin } from 'react-google-login'

const clientId = "1043160436627-t0siob1vmac373h292mh0dohemkjrr5m.apps.googleusercontent.com"

const Login = ({ userEmail, setUserEmail, userName, setUserName }) => {
    const onSuccess = (res) => {
        // console.log("this is res",res)
        console.log('Login success! current user:', res.profileObj)
        setUserEmail(res.profileObj.email)
        setUserName(res.profileObj.givenName)
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