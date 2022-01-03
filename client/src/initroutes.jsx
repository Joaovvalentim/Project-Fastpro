import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

const InitRoutes = () => (
  <>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </>
  );
export default InitRoutes;