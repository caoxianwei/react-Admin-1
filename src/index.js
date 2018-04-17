import fundebug from 'fundebug-javascript'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// eslint-disable-next-line
import axiosConfig from './utils/axiosConfig'
fundebug.apikey = 'd0907fa50c64f04449b43af2bb50f9b5fd4ed638599aa0d23f198a1690a6070b';

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
