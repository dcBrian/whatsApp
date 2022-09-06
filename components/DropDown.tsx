import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { LockClosedIcon } from '@heroicons/react/24/solid';
import Router from 'next/router';
import { Fragment } from 'react';
import { auth } from '../firebase';
type Props = {};

const Dropdown = (props: Props) => {
    return (
        <Menu as='div' className='relative inline-block text-left'>
            <Menu.Button className='icon-wrapper focus:outline-none  tooltip group'>
                <EllipsisVerticalIcon className='icon' />
            </Menu.Button>
            <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
            >
                <Menu.Items className='absolute right-0  w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-[0px_2px_5px_0px_rgba(11,20,26,0.26),0px_2px_10px_0px_rgba(11,20,26,0.16)] border border-[#fff] ring-none focus:outline-none'>
                    <div className='px-1 py-1 '>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={`${
                                        active && 'bg-gray-100 '
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                >
                                    <LockClosedIcon
                                        className='mr-2 -ml-1 h-5 w-5 text-gray-600'
                                        aria-hidden='true'
                                    />
                                    Archived
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={`${
                                        active && 'bg-gray-100 '
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                >
                                    <LockClosedIcon
                                        className='mr-2 -ml-1 h-5 w-5 text-gray-600'
                                        aria-hidden='true'
                                    />
                                    Settings
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={() => {
                                        Router.push('/');
                                        auth.signOut();
                                    }}
                                    className={`${
                                        active && 'bg-gray-100 '
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                >
                                    Logout
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
            {/* </button> */}
        </Menu>
    );
};

export default Dropdown;
