import { BarsArrowDownIcon, BarsArrowUpIcon } from '@heroicons/react/24/outline';
import {
    ArrowRightIcon,
    ChatBubbleBottomCenterTextIcon,
    MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';
import * as EmailValidator from 'email-validator';
import { addDoc, collection, query, where } from 'firebase/firestore';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../firebase';
import Avatar from './Avatar';
import Chat from './Chat';
import Dropdown from './DropDown';

const Sidebar = () => {
    const [user] = useAuthState(auth);
    const [sort, setSort] = useState(false);
    const [input, setInput] = useState('');
    const [snapshot] = useCollection(
        query(collection(db, 'chats'), where('users', 'array-contains', user?.email))
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
            <div className='h-g h-h flex sticky top-0 justify-between items-center'>
                <Avatar image={user.photoURL} />

                <div className='flex space-x-2'>
                    <button className='icon-wrapper tooltip group'>
                        <ChatBubbleBottomCenterTextIcon className='icon' />
                    </button>
                    <Dropdown />
                </div>
            </div>

            <div className='flex justify-center items-center px-3 py-2 space-x-3 border-b border-gray-200'>
                <div className='w-full flex rounded-md bg-gray-100 px-2 py-1'>
                    <div className='p-1 mr-2'>
                        {!input ? (
                            <MagnifyingGlassIcon className='icon-xs' />
                        ) : (
                            <ArrowRightIcon
                                className='icon-xs text-green-700 animate-rota'
                                onClick={() => setInput('')}
                            />
                        )}
                    </div>

                    <input
                        className='bg-transparent w-full text-sm placeholder-gray-500 outline-none select-none'
                        name='myInput'
                        type='text'
                        autoComplete='off'
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        placeholder={'Search or create chat'}
                    />
                </div>
                {sort ? (
                    <BarsArrowUpIcon className='icon' onClick={() => setSort((prev) => !prev)} />
                ) : (
                    <BarsArrowDownIcon className='icon' onClick={() => setSort((prev) => !prev)} />
                )}
            </div>

            {/* List of chats */}
            {snapshot?.docs?.map((chat) => (
                <Chat key={chat.id} id={chat.id} users={chat.data().users} />
            ))}
        </div>
    );
};

export default Sidebar;
