import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import POCPage from './poc'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <POCPage />
    </HelmetProvider>
  </React.StrictMode>
)
