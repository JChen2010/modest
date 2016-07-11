var React = require('react');
var ReactRouter = require('react-router');

function CourseSearch (props) {
  return (
    <div className="courseselector">
      <h3>Course: New course</h3>
      <h4>Instructor:</h4>
      <div>
      	<button type="button" className="btn btn-Default btn-lg btn-block">Add...</button>
      </div>
    </div>
  )
}

module.exports = CourseSearch;