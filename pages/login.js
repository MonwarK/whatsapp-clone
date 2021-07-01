import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";

export default function login() {

    const signIn = () => {
        auth
        .signInWithPopup(provider)
        .catch(alert)
    }

    return (
        <div className="grid place-items-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg p-20">
                <img className="w-48 h-48 mb-14" src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png" alt="Logo" />
                <Button variant="outlined" onClick={signIn}>Sign in with Google</Button>
            </div>
        </div>
    )
}
