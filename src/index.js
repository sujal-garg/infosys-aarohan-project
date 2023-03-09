import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCnfI90eSDcyXl5J8oAH7jpnCNw6A2J3zM",
  authDomain: "infosys-aarohan.firebaseapp.com",
  projectId: "infosys-aarohan",
  storageBucket: "infosys-aarohan.appspot.com",
  messagingSenderId: "43355679969",
  appId: "1:43355679969:web:9ac4132f24efb5d92bdba0"
};

initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)