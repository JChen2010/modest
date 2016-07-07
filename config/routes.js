var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory = ReactRouter.hashHistory;
var IndexRoute = ReactRouter.IndexRoute;

var Main = require('../components/Main');
var Home = require("../components/Home");
var Prototype = require("../components/Prototype");
var Student = require("../components/Student");

var routes = (
  <Router history={hashHistory}>
    <Route path='/' component={Main}>
      <IndexRoute component={Home} />
      <Route path='Guides' component={Prototype} />
      <Route path='Student' component={Student} />
    </Route>
  </Router>
);

module.exports = routes;