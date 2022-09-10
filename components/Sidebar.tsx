import { BarsArrowDownIcon, BarsArrowUpIcon } from '@heroicons/react/24/outline';
import {
    ArrowRightIcon,
    ChatBubbleBottomCenterTextIcon,
    MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';
import { addDoc, collection, query, where } from 'firebase/firestore';
import Router, { useRouter } from 'next/router';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../firebase';
import Avatar from './Avatar';
import Box from './Box';
import ChatCard from './ChatCard';
import Dropdown from './DropDown';
import Loader from './Loader';
import ProfileCard from './ProfileCard';

const Sidebar = () => {
    const [user] = useAuthState(auth);
    const [sort, setSort] = useState(false);
    const [input, setInput] = useState('');
    const [focus, setFocus] = useState(false);
    const [contact, setContact] = useState([]);
    const router = useRouter();
    const [snapshot] = useCollection(
        query(collection(db, 'chats'), where('users', 'array-contains', user?.email))
    );
    const [userAllSnapshot, loading] = useCollection(collection(db, 'users'));

    const createChat = async (input: string) => {
        let chat: any = doesChatExist(input);
        if (!chat) {
            chat = await addDoc(collection(db, 'chats'), {
                users: [user.email, input],
            });
        }
        setInput('');
        setFocus(false);

        if (!router?.query?.id || chat.id !== router?.query?.id) {
            Router.push(`/chat/${chat.id}`);
        }
    };

    const handleInput = (e: string) => {
        setInput(e);

        if (!!userAllSnapshot?.docs) {
            setContact(userAllSnapshot?.docs?.map((e) => e.data()));
        }
    };

    const doesChatExist = (recipientEmail) =>
        snapshot?.docs?.find((chat) => chat.data().users.find((u) => u === recipientEmail));

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
                        {!focus ? (
                            <MagnifyingGlassIcon className='icon-xs' />
                        ) : (
                            <ArrowRightIcon
                                className='icon-xs text-green-700 animate-rota'
                                onClick={() => {
                                    setInput('');
                                    setFocus(false);
                                    setContact(userAllSnapshot?.docs?.map((e) => e.data()));
                                }}
                            />
                        )}
                    </div>

                    <input
                        className='bg-transparent w-full text-sm placeholder-gray-500 outline-none select-none'
                        type='text'
                        autoComplete='new-password'
                        onChange={(e) => handleInput(e.target.value)}
                        onFocus={(e) => setFocus(true)}
                        onBlur={(e) => (!input || !input.trim()) && setFocus(false)}
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
            {!input ? (
                !snapshot ? (
                    <Box empty>
                        <Loader />
                    </Box>
                ) : snapshot?.docs?.length > 0 ? (
                    snapshot?.docs?.map((chat) => (
                        <Box active key={chat.id}>
                            <ChatCard id={chat.id} users={chat.data().users} />
                        </Box>
                    ))
                ) : (
                    <Box empty>You have no chat yet...</Box>
                )
            ) : (
                <>
                    <Box title>Contacts</Box>
                    {contact.length > 0 ? (
                        contact.map((contact) =>
                            contact.email === user.email ? (
                                false
                            ) : (
                                <Box active key={contact.email}>
                                    <ProfileCard
                                        email={contact.email}
                                        photoURL={contact.photoURL}
                                        handle={() => createChat(contact.email)}
                                    />
                                </Box>
                            )
                        )
                    ) : (
                        <Box empty>No matching contact...</Box>
                    )}
                </>
            )}
        </div>
    );
};

export default Sidebar;
