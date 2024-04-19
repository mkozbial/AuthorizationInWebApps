import React from 'react';
import ReactDOM from 'react-dom/client';
import AuthenticationPage from "./pages/AuthenticationPage/index.tsx";
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthenticationPage />
  </React.StrictMode>
);


