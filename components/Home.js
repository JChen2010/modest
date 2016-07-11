var React = require('react');
var ReactRouter = require('react-router');
var transparentBg = require('../styles').transparentBg;

function Home () {
  return (
    <div className="jumbotron text-center">
      <h3>This is a demo version of our product.</h3>
    </div>
  )
}

module.exports = Home;