import { LockClosedIcon } from '@heroicons/react/24/solid';
import Head from 'next/head';

export default function Home() {
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>

            <div className=' relative h-g h-screen flex flex-col flex-1 items-center justify-center space-y-10'>
                <img src='/home_icon.svg' />
                <div className='text-gray-500 text-sm flex flex-col items-center space-y-4'>
                    <h2 className='text-3xl font-light text-gray-700'>WhatsApp Web</h2>
                    <p className='text-center'>
                        Now send and receive messages without keeping your phone online.
                        <br />
                        Use whatsApp on up to 4 linked devices and 1 phone at the same time.
                    </p>
                </div>
                <div
                    className={`absolute text-gray-500 bottom-10 group flex w-full items-center justify-center  text-sm`}
                >
                    <LockClosedIcon className='mr-2 -ml-1 h-3 w-3 ' aria-hidden='true' />
                    End-to-end encrypted
                </div>
            </div>
        </>
    );
}
