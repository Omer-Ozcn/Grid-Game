import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { worker } from './mocks/worker.js';

import './index.css';
import { BrowserRouter } from 'react-router-dom';

//worker.start();

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
