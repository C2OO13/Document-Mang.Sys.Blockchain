import './App.css';
import React from 'react';

import GoogleAuth from './components/GoogleAuth';
import CreateCertificate from './components/CreateCertificate';

const App = () => {

  return (
    <div>
      <div className = "ui secondary pointing menu">
            <div className = "right menu">
                <GoogleAuth />
            </div>
      </div>
      <CreateCertificate />
      
    </div>
  );
}

export default App;
