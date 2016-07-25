var React = require('react');
var styles = require('../styles');

var CourseSelector = require('../components/CourseSelector');
var CourseSearch = require('../components/CourseSearch');

var CourseSelectorContainer = React.createClass({
  getInitialState: function () {
    return {
      
    }
  },
  componentDidMount: function () {
    
  },
  
  render: function () {
    return (
    	<div className="container-full text-center">
	    	<div className="jumbotron text-center">
	        	<h3>Your courses</h3>   
	    	</div>  
	      	<div className="container text-center">
		      	<CourseSelector coursename="TOEFL Reading" instrname="Mr. Brooks"></CourseSelector>
				<CourseSelector coursename="TOEFL Listening" instrname="Ms. Wright"></CourseSelector>
			    <CourseSearch/>					
	    	</div>
	    </div>
	    )
  }
});

module.exports = CourseSelectorContainer;