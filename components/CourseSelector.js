var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

function CourseSelector (props) {
  return (
    <div className="courseselector">
      <h3>Course: {props.coursename}</h3>
      <h4>Instructor: {props.instrname}</h4>
      <div>
      	<Link to='/Course'>
      		<button type="button" className="btn btn-warning btn-lg btn-block">Go</button>
      	</Link>
      </div>
    </div>
  )
}

module.exports = CourseSelector;