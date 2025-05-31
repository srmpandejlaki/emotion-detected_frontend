import React from 'react';
import { Link } from 'react-router-dom';

function NavValidation() {
  return (
    <div className='navValidation'>
      <Link to='/validation' className='navItem'>
        Predict Results
      </Link>
      <Link to='/validation/results' className='navItem'>
        Validation Results
      </Link>
      <Link to='/validation/matrics' className='navItem'>
        Class Matrics
      </Link>
    </div>
  );
}

export default NavValidation;
