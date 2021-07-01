import { Circle } from "better-react-spinkit"
import Image from "next/image"

export default function Loading() {
    return (
        <center className="min-h-screen grid place-items-center">
            <div>
                <div className="mb-14">
                    <Image 
                        width={192}
                        height={192}
                        src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"
                        alt="Logo"
                    />
                </div>
                <Circle color="#3CBC28" size={60} />
            </div>
        </center>
    )
}
