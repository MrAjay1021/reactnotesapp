import React from 'react';
import ReactDOM from 'react-dom/client';
import { MainPage } from './screens/MainPage';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MainPage />
  </React.StrictMode>
);
