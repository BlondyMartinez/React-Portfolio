import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import './styles/scrollbar.css';
import reportWebVitals from './tests/reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './Layout';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Layout />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
