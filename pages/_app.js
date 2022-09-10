import ProgressBar from '@badrap/bar-of-progress';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { Router } from 'next/router';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loader from '../components/Loader';
import Sidebar from '../components/Sidebar';
import { auth, db } from '../firebase';
import '../styles/globals.css';
import Login from './login';

function MyApp({ Component, pageProps }) {
    const [user, loading] = useAuthState(auth);
    const progress = new ProgressBar({
        size: 3,
        color: '#28cba8',
        className: 'z-10',
        delay: 100,
    });
    Router.events.on('routeChangeStart', progress.start);
    Router.events.on('routeChangeComplete', progress.finish);
    Router.events.on('routeChangeError', progress.finish);

    useEffect(() => {
        (async function setUser() {
            if (user) {
                await setDoc(
                    doc(db, 'users', user.uid),
                    {
                        email: user.email,
                        lastSeen: serverTimestamp(),
                        photoURL: user.photoURL,
                    },
                    { merge: true }
                );
            }
        })();
    }, [user]);

    if (loading)
        return (
            <div className='flex flex-col h-screen items-center justify-center space-y-7 text-gray-500'>
                <Loader />
                <div>
                    <p>Authenticating user...</p>
                </div>
            </div>
        );
    if (!user) return <Login />;

    return (
        <div className='flex w-full'>
            <Sidebar />
            <Component {...pageProps} />
        </div>
    );
}

export default MyApp;
