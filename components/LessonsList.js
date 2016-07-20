var React = require('react');
var ReactRouter = require('react-router');
var PropTypes = React.PropTypes;

var LessonsList = React.createClass({
  propTypes: {
  	current_lesson: PropTypes.number.isRequired,
  	handleChangeLesson: PropTypes.func.isRequired
  },	

  getInitialState: function () {
    return {
      
    }
  },

  componentDidMount: function () {
  	document.getElementById("main-div").childNodes[this.props.current_lesson].className = "list-group-item active";
  },
  
  render: function () {
    return (
    	<div id="main-div" className="list-group">
        	<a className="list-group-item" data-index="0" onClick={this.props.handleChangeLesson}>Lesson 1</a>
          <a className="list-group-item" data-index="1" onClick={this.props.handleChangeLesson}>Lesson 2</a>
          <a className="list-group-item" data-index="2" onClick={this.props.handleChangeLesson}>Lesson 3</a>
          <a className="list-group-item" data-index="3" onClick={this.props.handleChangeLesson}>Lesson 4</a>
          <a className="list-group-item" data-index="4" onClick={this.props.handleChangeLesson}>Lesson 5</a>
        </div>
	    )
  }
});

module.exports = LessonsList;