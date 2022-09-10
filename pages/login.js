import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const Login = () => {
    const [signInWithGoogle] = useSignInWithGoogle(auth);

    return (
        <div className='grid h-screen place-items-center bg-gray-100 p-8'>
            <Head>
                <title>Login </title>
            </Head>

            <div className='flex flex-col bg-white items-center p-20 rounded-md shadow-md'>
                <div className='relative h-20 w-20 mb-12'>
                    <Image
                        className=''
                        layout='fill'
                        src='http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png'
                    />
                </div>
                <button
                    onClick={() => signInWithGoogle()}
                    className='border border-gray-200 w-full p-3 rounded-sm'
                >
                    Sign in with Google
                </button>
            </div>
        </div>
    );
};

export default Login;
