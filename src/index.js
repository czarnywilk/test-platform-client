import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import "bootstrap-icons/font/bootstrap-icons.css";
import 'react-toastify/dist/ReactToastify.css';
import './CSS/Utils.css'
import './CSS/Colors.css'
import './CSS/Report.css'
import './CSS/Questions.css'
import './CSS/MainForm.css'
import './CSS/AdminPanel.css'
import './CSS/ResultScreen.css'
import './CSS/Fonts.css'
import './CSS/Roles.css'
import './CSS/Autocomplete.css'
import './CSS/Pagination.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
