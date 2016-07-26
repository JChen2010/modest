import firebaseConfig from './constants/firebase.js';
import firebase from 'firebase';
firebase.initializeApp(firebaseConfig);

import moment from 'moment';
import React from 'react';
import ReactDOM from 'react-dom';
var routes = require('./config/routes');

ReactDOM.render(
  routes,
  document.getElementById('app')
);
