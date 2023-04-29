import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import './styles/index.css';


import 'font-awesome/css/font-awesome.min.css'

import { store } from './redux/store'
import { Provider } from 'react-redux'

import { BrowserRouter } from 'react-router-dom'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

let persistor = persistStore(store)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App/>
        <ToastContainer/>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);

