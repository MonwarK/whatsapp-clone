import { Avatar } from "@material-ui/core"
import { auth, db } from "../firebase"
import getRecipientEmail from "../utils/getRecipientEmail"
import { useCollection } from "react-firebase-hooks/firestore"
import { useRouter } from "next/router"

export default function Chat({id, users}) {

    const router = useRouter()

    const recipientEmail = getRecipientEmail(users, auth.currentUser.email)
    const [recipientSnapshot] = useCollection(
        db.collection("users").where("email", "==", getRecipientEmail(users, auth.currentUser.email))
    )
    const recipient = recipientSnapshot?.docs?.[0]?.data();

    const enterChat = () => {
        router.push(`/chat/${id}`)
    }

    return (
        <div onClick={enterChat} className="break-words hover:bg-gray-100 flex items-center p-3 cursor-pointer">
            <Avatar src={recipient?.photoURL}/>
            <p className="ml-2">{recipientEmail}</p>
        </div>
    )
}
