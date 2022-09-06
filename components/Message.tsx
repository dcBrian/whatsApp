import moment from 'moment';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

type Props = { user: string; item: { message: string; time: string } };

const Message = ({ user, item }: Props) => {
    const [userLogged] = useAuthState(auth);
    const isMine = user === userLogged.email;
    return (
        <div
            className={`relative w-fit min-w-[90px] p-3 pb-6 m-3 rounded-md text-left ${
                isMine ? 'mr-auto bg-lime-200' : 'ml-auto bg-gray-100'
            }`}
        >
            <p>
                {item.message}
                <span className='absolute right-0 bottom-0 text-right text-gray-600 px-2 py-1 text-[0.70rem]'>
                    {item ? moment(item.time).format('LT') : '...'}
                </span>
            </p>
        </div>
    );
};

export default Message;
