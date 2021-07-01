import Sidebar from "../../components/Sidebar";
import Head from 'next/head'
import ChatContainer from "../../components/ChatContainer";
import { db } from "../../firebase"


export default function Chat({messages, chat}) {

    return (
        <div>
            <Head>
                <title>Chat</title>
            </Head>

            <div className="flex">
                <Sidebar />
                <ChatContainer 
                    messages={messages}
                    chat={chat}
                />
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const ref = db.collection("chats").doc(context.query.id)

    const messageRes = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get()

    const messages = messageRes.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
    .map(messages => ({
        ...messages,
        timestamp: messages.timestamp.toDate().getTime()
    }))

    const chatRes = await ref.get();

    const chat = {
        id: chatRes.id,
        ...chatRes.data()
    }

    return {
        props: {
            messages: JSON.stringify(messages),
            chat: chat
        }
    }
}