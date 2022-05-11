import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import axios from '../api';

const Header = () => {

  return (
    <div className='ui secondary pointing menu'>
      <Link to='/dashboard' className='item'>
        BBDMS
      </Link>
      <div className='right menu'>
        <Link to='/create_certificate' className='item'>
          Create Certificate
        </Link>
        <Link to='/verify_certificate' className='item'>
          Verify Certificate
        </Link>
        <Link to='/' className='item' onClick={() => {}}>
          Sign Out
        </Link>
      </div>
    </div>
  );
};

export default Header;
