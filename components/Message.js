import moment from "moment";
import { auth } from "../firebase"

export default function Message({user, message}) {

    const currentUser = auth.currentUser;

    const TypeOfMessage = user===currentUser.email ? true : false

    return (
        <div className={`w-[fit-content] p-4 rounded-lg m-3 relative ${TypeOfMessage?"ml-auto bg-[#dcf8c6] text-right":"bg-gray-100"}`}>
            <p>
                {message.message}
            </p>
            <p className="text-[9px] text-gray-400 text-right">
                {message.timestamp ? moment(message.timestamp).format("LTS") : "..."}
            </p>
        </div>
    )
}
