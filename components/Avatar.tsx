// import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { auth } from '../firebase';

const Avatar = ({ image }) => {
    // const { data: session } = useSession();
    return (
        <div
            onClick={() => auth.signOut()}
            className={`relative overflow-hidden h-10 w-10 rounded-full border-gray-300 bg-white cursor-pointer hover:opacity-80`}
        >
            <Image
                className=''
                layout='fill'
                src={`https://avatars.dicebear.com/api/open-peeps/
                ${
                    // seed || session?.user?.name ||
                    'placeholder'
                }.svg`}
            />
        </div>
    );
};

export default Avatar;
