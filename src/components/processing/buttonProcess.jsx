import React from 'react';

function ButtonProcess({ onProcess }) {
  return (
    <div className="btnProcess">
      <button className="btn-process" onClick={onProcess}>Proses Data</button>
    </div>
  );
};

export default ButtonProcess;
