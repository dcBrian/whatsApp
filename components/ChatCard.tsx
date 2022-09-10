import { collection, query, where } from 'firebase/firestore';
import Router, { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../firebase';
import { useSidebarStore } from '../store';
import ProfileCard from './ProfileCard';

type Props = {
    id: string;
    users: string[];
};

export const getRecipientEmail = (users, loggedIn) =>
    users && loggedIn ? users.filter((u) => u !== loggedIn.email)[0] : null;

const ChatCard = ({ id, users }: Props) => {
    const [user] = useAuthState(auth);
    const router = useRouter();
    const handleSideClick = useSidebarStore((state) => state.setFalse);
    const recipientEmail = getRecipientEmail(users, user);
    const [recipientSnapshot] = useCollection(
        query(collection(db, 'users'), where('email', '==', recipientEmail))
    );
    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const enterChat = () => {
        if (!router?.query?.id || id !== router?.query?.id) {
            Router.push(`/chat/${id}`);
        }
        handleSideClick();
    };

    return (
        <ProfileCard photoURL={recipient?.photoURL} email={recipient?.email} handle={enterChat} />
    );
};

export default ChatCard;
