import { auth, db } from "../firebase"
import { Avatar, IconButton } from "@material-ui/core";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useCollection } from "react-firebase-hooks/firestore"
import { useRouter } from "next/router"
import Message from "../components/Message"
import { InsertEmoticon } from "@material-ui/icons";
import { useRef, useState } from "react";
import firebase from "firebase"
import getRecipientEmail from "../utils/getRecipientEmail";
import TimeAgo from 'timeago-react';

export default function ChatContainer({messages, chat}) {

    const user = auth.currentUser;
    const router = useRouter();
    const endOfMessageRef = useRef(null)

    const [messagesSnapshot] = useCollection(
        db
        .collection("chats")
        .doc(router.query.id)
        .collection("messages")
        .orderBy("timestamp", "asc")
    );

    const [input, setInput] = useState("")

    const scrollToBottom = () => {
        endOfMessageRef.current.scrollIntoView({
            behaviour: "smooth",
            block: "start"
        })
    }

    const showMessages = () => {
        if(messagesSnapshot) {
            return messagesSnapshot.docs.map(message => (
                <Message 
                    key={message.id}
                    user={message.data().user}
                    message={{
                        ...message.data(),
                        timestamp: message.data().timestamp?.toDate().getTime()
                    }}
                />
            ))
        }
    }

    const sendMessage = (e) => {
        e.preventDefault();

        db
        .collection("users")
        .doc(user.uid)
        .set(
            {
                lastSeen: firebase.firestore.FieldValue.serverTimestamp()
            },
            {
                merge: true
            }
        );

        db
        .collection("chats")
        .doc(router.query.id)
        .collection("messages")
        .add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user.email,
            photoURL: user.photoURL
        })

        setInput("")
        scrollToBottom();
    }

    const recipientEmail = getRecipientEmail(chat.users, user.email)

    const [recipientSnapshot] = useCollection(
        db
        .collection("users")
        .where("email", "==", getRecipientEmail(chat.users, user.email))
    )

    const recipient = recipientSnapshot?.docs?.[0].data();

    return (
        <div className="bg-[#E6DEDA] h-screen flex-1 flex flex-col">
            {/* Header */}
            <div className="bg-white flex items-center justify-between p-3 sticky">
                <Avatar src={recipient?.photoURL} />

                <div className="flex-1 ml-5">
                    <h3 className="font-bold">{recipientEmail}</h3>
                    <p className="text-sm">
                        Last Active: {recipient?.lastSeen?.toDate() ? 
                            <TimeAgo
                                datetime={recipient?.lastSeen?.toDate()}
                            />
                            : <label>Unavailable</label>
                        }</p>
                </div>

                <div>
                    <IconButton className="focus:outline-none">
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton className="focus:outline-none">
                        <MoreVertIcon />
                    </IconButton>
                </div>

            </div>

            {/* Chats */}
            <div className="overflow-y-scroll flex-1">
               {showMessages()}
               <span ref={endOfMessageRef} />
            </div>

            {/* Messages */}
            <div className="bg-white flex items-center p-2">
                <InsertEmoticon 
                    className="mx-3"
                />
                <form className="flex-1">
                    <input 
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        className="w-full bg-gray-100 p-2 rounded-md focus:outline-none"
                        type="text"
                    />
                    <button hidden disabled={!input} type="submit" onClick={sendMessage}>Send message</button>
                </form>
            </div>

        </div>
    )
}

