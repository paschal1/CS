import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom';
import router from "./router.jsx";
import { ContextProvider } from './contexts/ContextProvider.jsx';
import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>

  </React.StrictMode>,
)
