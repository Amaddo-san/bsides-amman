import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// GitHub Pages SPA routing fix
const redirect = sessionStorage.redirect;
if (redirect) {
  sessionStorage.removeItem('redirect');
  const url = new URL(redirect);
  const path = url.pathname.replace('/bsides-amman', '') || '/';
  window.history.replaceState(null, null, '/bsides-amman' + path + url.search + url.hash);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)