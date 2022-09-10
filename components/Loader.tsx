import { DotPulse } from '@uiball/loaders';

const Loader = () => {
    return (
        <div className='flex justify-center items-center py-3'>
            <DotPulse size={47} speed={1} color='#28cba8' />
        </div>
    );
};

export default Loader;
