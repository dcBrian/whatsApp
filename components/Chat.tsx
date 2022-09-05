import { collection, query, where } from 'firebase/firestore';
import Router from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../firebase';
import Avatar from './Avatar';

type Props = {
    id: string;
    users: string[];
};

export const getRecipientEmail = (users, loggedIn) =>
    users && loggedIn ? users.filter((u) => u !== loggedIn.email)[0] : null;

const Chat = ({ id, users }: Props) => {
    const [user] = useAuthState(auth);
    const recipientEmail = getRecipientEmail(users, user);
    const [recipientSnapshot] = useCollection(
        query(collection(db, 'users'), where('email', '==', recipientEmail))
    );
    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const enterChat = () => Router.push(`/chat/${id}`);

    return (
        <div
            onClick={enterChat}
            className={`flex items-center cursor-pointer break-words hover:bg-gray-100`}
        >
            <div className='flex w-full items-center pl-4 '>
                {recipient ? (
                    <Avatar image={recipient.photoURL} />
                ) : (
                    <Avatar image={recipientEmail} />
                )}
                <div className='flex-1 border-b border-gray-200 ml-6 py-5 pr-4'>
                    {recipient ? recipient.photoURL : recipientEmail}
                </div>
            </div>
        </div>
    );
};

export default Chat;
