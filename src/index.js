import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(

  <React.StrictMode>
    
    <head>
    <meta charset="UTF-8"/>
  <meta name="description" content="E-commerce TAC"/>
  <meta name="keywords" content="TAC, HTML , JS , REACTJS"/>
  <meta name="author" content="EHPO"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>
    <App />
    
  </React.StrictMode>,
  document.getElementById('root')
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
