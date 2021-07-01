import { Avatar, IconButton } from "@material-ui/core"
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import EmailValidator from "email-validator"
import { auth, db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore"
import Chat from "./Chat"
import { useRouter } from "next/router";

export default function Sidebar() {

    const userChatRef = db.collection("chats").where("users", "array-contains", auth.currentUser.email)
    const [chatsSnapshot] = useCollection(userChatRef)

    const router = useRouter()

    const createChat = () => {
        const input = prompt("Please enter an email addres for the user you wish to chat with");

        if(!input) return null;

        if(EmailValidator.validate(input) && !chatAlreadyExists(input) && input!==auth.currentUser.email ) {
            db
            .collection("chats")
            .add({
                users: [auth.currentUser.email, input]
            })
        }
    }

    const chatAlreadyExists = (recipientEmail) => 
    !!chatsSnapshot?.docs.find(
        (chat) =>
          chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );
    

    return (
        <div className="min-h-screen w-96 z-10">
            {/* Header */}
            <div className="flex justify-between border-0 border-b-[1px] border-solid border-gray-100 p-3">
                <Avatar src={auth.currentUser.photoURL} className="cursor-pointer hover:opacity-80" onClick={() => {router.push("/"); auth.signOut();}}/>
                <div>
                    <IconButton className="focus:outline-none">
                        <ChatIcon />
                    </IconButton>
                    <IconButton className="focus:outline-none">
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            {/* Search */}
            <div className="flex items-center p-4">
                <SearchIcon />
                <input 
                    className="outline-none flex-1 mx-2"
                    type="text" 
                    placeholder="Search in chats"
                />
            </div>
            <button onClick={createChat} className="w-full font-medium hover:bg-gray-100 py-2 focus:outline-none my-3">
                START A NEW CHAT
            </button>

            {/* Contacts */}
            <div>
                {
                    chatsSnapshot?.docs.map(chat => 
                        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
                    )
                }
            </div>

        </div>
    )
}
