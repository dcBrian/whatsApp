import { DotWave } from '@uiball/loaders';
import React from 'react';

const Loading = () => {
    return (
        <div className='h-screen flex justify-center items-center'>
            <DotWave size={47} speed={1} color='green' />
        </div>
    );
};

export default Loading;
