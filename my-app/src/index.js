import React from 'react';
import ReactDOM from 'react-dom/client';
import AuthenticationPage from "./pages/AuthenticationPage/index.tsx";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthenticationPage />
  </React.StrictMode>
);

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap';
document.head.appendChild(link);
