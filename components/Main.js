var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var transparentBg = require('../styles').transparentBg;
var menuStyle = require('../styles').menuStyle;

var Main = React.createClass({
  render: function () {
    return (
      <div className='container-full'>
        <div className="navbar navbar-default" style={menuStyle}>
          <div className='button'>
          	<Link to='/'>
              <button type='button' className='btn btn-dunger'>Home</button>
          	</Link>
          </div>
          <div className='button'>
          	<Link to='/CourseSelector'>
              <button type='button' className='btn btn-success'>Student</button>
          	</Link>
          </div>
          <div className='button'>
          	<Link to='/Teacher'>
              <button type='button' className='btn btn-success'>Teacher</button>
          	</Link>
          </div>
        </div>  
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
});

module.exports = Main;