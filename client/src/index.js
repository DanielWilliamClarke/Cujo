import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import App from './App';

axios.get("/api/v1/cv")
  .then(res => {
    ReactDOM.render(
      <React.StrictMode>
        <App cv={res.data} />
      </React.StrictMode>,
      document.getElementById('root')
    );
  });


