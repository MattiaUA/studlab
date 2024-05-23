import React from 'react'
import ReactDOM from 'react-dom/client'
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import App from './App.jsx'
import './index.css'

// Para usar la camara en navegador
defineCustomElements(window);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
