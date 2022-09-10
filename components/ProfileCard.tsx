import Avatar from './Avatar';

type Props = {
    email?: string;
    photoURL?: string;
    handle: (e: any) => void;
};

const ProfileCard = ({ email, photoURL, handle }: Props) => {
    return (
        <div className={`flex items-center cursor-pointer break-words p-5 `} onClick={handle}>
            <div className='flex w-full items-center'>
                <Avatar image={photoURL} />

                <div className='flex-1 pl-4 select-none truncate'>{email}</div>
            </div>
        </div>
    );
};

export default ProfileCard;
