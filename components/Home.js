var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var transparentBg = require('../styles').transparentBg;

function Home () {
  return (
    <div className="jumbotron col-sm-12 text-center" style={transparentBg}>
      <h1>Modest (Demo)</h1>
      <Link to='/Guides'>
        <button type='button' className='btn btn-lg btn-success'>Create Guides</button>
      </Link>
      <div>
      	<Link to='/Student'>
        	<button type='button' className='btn btn-lg btn-success'>Learn</button>
      	</Link>
      </div>
    </div>
  )
}

module.exports = Home;