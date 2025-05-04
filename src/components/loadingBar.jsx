import React from 'react';

const Loading = ({ page = '' }) => {
  return (
    <div className='pageload'>
      <div className={`pageCenter ${page !== '' ? page : ''}`}>
        <div className='pageRing'></div>
      </div>
    </div>
  );
};

export default Loading;