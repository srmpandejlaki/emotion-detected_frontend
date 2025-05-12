import React from 'react';
import { Link } from 'react-router-dom';

function NavProcessing() {
  return (
    <div className='navProcessing'>
      <Link to='/processing' className='navItem'>
        Dataset
      </Link>
      <Link to="/processing/prob-prior" className="navItem">Probabilitas Prior</Link>
      <Link to="/processing/prob-kondisi" className="navItem">Probabilitas Kondisi</Link>
      <Link to="/processing/bert-lexicon" className="navItem">Bert&Lexicon</Link>
      <Link to='/processing/confusion-metrix' className='navItem'>
        Class Matrics
      </Link>
    </div>
  );
}

export default NavProcessing;
