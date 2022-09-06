import { FaceSmileIcon } from '@heroicons/react/24/outline';
import { EllipsisVerticalIcon, PaperClipIcon } from '@heroicons/react/24/solid';
import {
    addDoc,
    collection,
    doc,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    where,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import TimeAgo from 'timeago-react';
import { auth, db } from '../firebase';
import Avatar from './Avatar';
import Message from './Message';

type Props = {
    chat: any;
    messages: any[];
    recipientEmail: string;
};

const ChatScreen = ({ chat, messages, recipientEmail }: Props) => {
    const endOfMessages = useRef(null);
    const router = useRouter();
    const [user] = useAuthState(auth);
    const [input, setInput] = useState('');
    const [snapshot, loading] = useCollection(
        query(
            collection(db, 'chats', router.query.id as string, 'messages'),
            orderBy('time', 'asc')
        )
    );

    const [recipientSnapshot] = useCollection(
        query(collection(db, 'users'), where('email', '==', recipientEmail))
    );
    const recipient = recipientSnapshot?.docs?.[0]?.data();

    const show = () => {
        return snapshot
            ? snapshot.docs.map((e) => (
                  <Message
                      key={e.id}
                      user={e.data().user}
                      item={{
                          message: e.data().message,
                          time: e.data().time?.toDate().getTime(),
                      }}
                  />
              ))
            : messages?.map((e) => <Message key={e.id} user={e.user} item={e} />);
    };

    const scrollToBottom = (type: string) => {
        endOfMessages.current.scrollIntoView({ block: 'start', behavior: type });
    };

    const sendMessage = (e) => {
        e.preventDefault();
        setDoc(doc(db, 'users', user.uid), { lastSeen: serverTimestamp() }, { merge: true });

        addDoc(collection(db, 'chats', router.query.id as string, 'messages'), {
            time: serverTimestamp(),
            message: input,
            user: user.email,
            photoURL: user.photoURL,
        });
        setInput('');
    };

    useEffect(() => {
        if (loading) {
            scrollToBottom('instant');
        } else {
            scrollToBottom('smooth');
        }
    }, [snapshot]);

    return (
        <div className='overflow-hidden h-full flex flex-col'>
            <div className='h-g h-h sticky top-0 flex items-center'>
                <Avatar image={recipient?.photoURL} />
                <div className='ml-[14px] pb-1 pt-auto flex-1'>
                    <h3 className=''>{recipientEmail}</h3>
                    <p className='text-gray-500 text-xs'>
                        last active:{' '}
                        {recipient?.lastSeen?.toDate() ? (
                            <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
                        ) : (
                            <span>...</span>
                        )}
                    </p>
                </div>
                <div className='flex space-x-2'>
                    <button className='icon-wrapper'>
                        <EllipsisVerticalIcon className='icon' />
                    </button>
                </div>
            </div>
            <div className='overflow-y-auto flex-1'>
                {show()}

                <div ref={endOfMessages} />
            </div>
            <div className='h-16'>
                <form className='h-full flex w-full items-center bg-gray-100 px-2'>
                    <div className='icon-wrapper'>
                        <FaceSmileIcon className='icon' />
                    </div>
                    <div className='icon-wrapper'>
                        <PaperClipIcon className='icon w-5 mx-[2px]' />
                    </div>

                    <input
                        className='flex-1 outline-none rounded-md bg-white px-2 py-2 mx-2 text-sm'
                        placeholder='Taper un message'
                        type='text'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                        className='hidden'
                        disabled={!input}
                        type='submit'
                        onClick={sendMessage}
                    ></button>
                </form>
            </div>
        </div>
    );
};

export default ChatScreen;
