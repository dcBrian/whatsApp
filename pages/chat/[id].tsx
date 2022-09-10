import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import Head from 'next/head';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getRecipientEmail } from '../../components/ChatCard';
import ChatScreen from '../../components/ChatScreen';
import { auth, db } from '../../firebase';

type Props = {
    chat: any;
    messages: string[];
};

const ChatPage = ({ chat, messages }: Props) => {
    const [user] = useAuthState(auth);
    const recipientEmail = getRecipientEmail(chat.users, user);

    return (
        <>
            <Head>
                <title>Chat with {recipientEmail}</title>
            </Head>

            <div className="h-screen flex-1 bg-[url('/background.png')]">
                <ChatScreen chat={chat} messages={messages} recipientEmail={recipientEmail} />
            </div>
        </>
    );
};

export default ChatPage;

export const getServerSideProps = async (context) => {
    const colRef = doc(db, 'chats', context.query.id);
    const subColRef = query(
        collection(db, 'chats', context.query.id, 'messages'),
        orderBy('time', 'asc')
    );
    const snap = await getDocs(subColRef);

    const messages = snap?.docs?.map((doc) => {
        const data = doc.data();
        return {
            id: doc.id,
            message: data.message,
            user: data.user,
            photoURL: data.photoURL,
            time: data.time.toDate().getTime(),
        };
    });

    const chatRef = await getDoc(colRef);
    const chat = {
        id: chatRef.id,
        ...chatRef.data(),
    };

    return {
        props: {
            chat: chat,
            messages: messages,
        },
    };
};
