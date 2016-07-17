var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory = ReactRouter.hashHistory;
var IndexRoute = ReactRouter.IndexRoute;

var Main = require('../components/Main');
var Home = require("../components/Home");
var CourseSelectorContainer = require("../containers/CourseSelectorContainer");
var GuideCreatContainer = require("../containers/GuideCreateContainer");
var CourseContainer = require("../containers/CourseContainer");

var routes = (
  <Router history={hashHistory}>
    <Route path='/' component={Main}>
      <IndexRoute component={Home} />
      <Route path='Teacher' component={GuideCreatContainer} />
      <Route path='CourseSelector' component={CourseSelectorContainer} />
      <Route path='Course' component={CourseContainer} />

    </Route>
  </Router>
);

module.exports = routes;