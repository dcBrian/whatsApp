import { PlusCircleIcon } from '@heroicons/react/24/outline';
import {
    ChatBubbleBottomCenterTextIcon,
    EllipsisVerticalIcon,
    MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';
import * as EmailValidator from 'email-validator';
import { addDoc, collection, query, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../firebase';
import Avatar from './Avatar';
import Chat from './Chat';

const Sidebar = () => {
    const [user] = useAuthState(auth);

    const [snapshot] = useCollection(
        query(collection(db, 'chats'), where('users', 'array-contains', user.email))
    );
    const createChat = async () => {
        const input = prompt('please enter an email');
        if (!input) return;

        if (EmailValidator.validate(input) && input !== user.email && !doesChatExist(input)) {
            await addDoc(collection(db, 'chats'), {
                users: [user.email, input],
            });
        }
    };

    const doesChatExist = (recipientEmail) =>
        !!snapshot?.docs?.find((chat) => chat.data().users.find((u) => u === recipientEmail));

    return (
        <div className='min-w-[450px] border-r border-gray-200'>
            <div className='h-g h-h flex sticky top-0 z-50 justify-between items-center'>
                <Avatar image={'http://localhost:3000/test.png'} />

                <div className='flex space-x-2'>
                    <button className='icon-wrapper'>
                        <ChatBubbleBottomCenterTextIcon className='icon' />
                    </button>

                    <button className='icon-wrapper'>
                        <EllipsisVerticalIcon className='icon' />
                    </button>
                </div>
            </div>

            <div className='flex justify-center items-center px-3 py-2 space-x-3 border-b border-gray-200'>
                <div className='w-full flex rounded-md bg-gray-100 px-2 py-1'>
                    <div className='p-1 mr-2'>
                        <MagnifyingGlassIcon className='icon-xs' />
                    </div>

                    <input
                        className='bg-transparent w-full text-sm placeholder-gray-500 outline-none'
                        type='text'
                        autoComplete='false'
                        placeholder={'Rechercher une conversation'}
                    />
                </div>
                <PlusCircleIcon className='icon' onClick={createChat} />
            </div>

            {/* List of chats */}
            {snapshot?.docs?.map((chat) => (
                <Chat key={chat.id} id={chat.id} users={chat.data().users} />
            ))}
        </div>
    );
};

export default Sidebar;
