import Head from 'next/head';
import Sidebar from '../components/Sidebar';

export default function Home() {
    return (
        <div className='flex'>
            <Head>
                <title>Home</title>
            </Head>
            <Sidebar></Sidebar>
            <div className='h-g h-screen flex flex-col flex-1 items-center justify-center space-y-10'>
                <img src='/home_icon.svg' />
                <div className='text-gray-500 text-sm flex flex-col items-center space-y-4'>
                    <h2 className='text-3xl font-light text-gray-700'>WhatsApp Web</h2>
                    <p className='text-center'>
                        Envoyez et recevez des messages sans avoir à garder votre téléphone
                        connecté.
                        <br />
                        Utilisez WhatsApp sur un maximum de 4 appareils et 1 téléphone,
                        simultanément.
                    </p>
                    <p></p>
                </div>
            </div>
        </div>
    );
}
