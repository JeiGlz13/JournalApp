import React from 'react';
import Typical from 'react-typical';
import relojArena from '../../assets/relojArena.gif';

export const JournalLoading = () => {
  return (
    <div className='loading__screen'>
        <img src= {relojArena} alt='loading' />
        <Typical
            steps={['Loading...', 1200, '', 550]}
            loop={Infinity}
            wrapper="h1"
        />
    </div>
  )
}
