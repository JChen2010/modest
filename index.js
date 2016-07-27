var firebaseConfig = require('./config/firebase');
var Firebase = require('firebase');
Firebase.initializeApp(firebaseConfig);

var React = require('react');
var ReactDOM = require('react-dom');
var routes = require('./config/routes');

ReactDOM.render(
  routes,
  document.getElementById('app')
);
