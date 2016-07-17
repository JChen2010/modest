var React = require('react');
var ReactRouter = require('react-router');

function Course (props) {
  return (
    <div className="Lessons-List">
    	<ul>
    		props.lessons.map(function(lesson) {
    			return React.CreateElement("li", null, lesson);
    		})
    	<ul>
    		
    </div>
  )
}

module.exports = Course;