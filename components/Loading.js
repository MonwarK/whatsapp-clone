import { Circle } from "better-react-spinkit"

export default function Loading() {
    return (
        <center className="min-h-screen grid place-items-center">
            <div>
                <img className="w-48 h-48 mb-14" src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png" alt="Logo" />
                <Circle color="#3CBC28" size={60} />
            </div>
        </center>
    )
}
