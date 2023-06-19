import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AuthBlock from './containers/AuthBlock/AuthBlock';
import './index.css';

const App = () => {

  return (
    <BrowserRouter>
      <AuthBlock />
    </BrowserRouter>
  );
}

export default App;
