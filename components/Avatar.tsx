import Image from 'next/image';

const Avatar = ({ image }) => {
    return (
        <div
            onDragStart={(e) => e.preventDefault()}
            className={`relative overflow-hidden h-10 w-10 rounded-full border-gray-300 bg-white cursor-pointer hover:opacity-95 select-none`}
        >
            {image && <Image className='' layout='fill' src={image} />}
        </div>
    );
};

export default Avatar;
