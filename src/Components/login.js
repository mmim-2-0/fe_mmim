import { GoogleLogin } from 'react-google-login'

const clientId = "1043160436627-t0siob1vmac373h292mh0dohemkjrr5m.apps.googleusercontent.com"

const Login = () => {
    const onSuccess = (res) => {
        console.log('Login success! current user:', res.profileObj)
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