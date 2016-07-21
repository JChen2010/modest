var React = require('react');
var ReactRouter = require('react-router');
var PropTypes = React.PropTypes;

var LessonsList = React.createClass({
  propTypes: {
  	current_lesson: PropTypes.number.isRequired,
  	handleChangeLesson: PropTypes.func.isRequired,
    handleNextLesson: PropTypes.func.isRequired,
    course: PropTypes.array.isRequired,
    altLessonsIndex: PropTypes.array.isRequired
  },	

 
  render: function () {
    return (
    	<div>
        <div className="list-group">
          {
            this.props.course.map(function(lesson, i){
              if (i == this.props.current_lesson) {
                return (
                  <div style={{display: "flex"}}>
                    <button type="button" className="list-group-item active" data-index={i} onClick={this.props.handleChangeLesson}>{lesson[this.props.altLessonsIndex[i]][0]}</button>
                    <button type="button" className="btn btn-default btn-xs">
                      <span className="glyphicon glyphicon-star" aria-hidden="true"></span>Top
                    </button>
                    <button type="button" className="btn btn-default btn-xs" data-index={i} onClick={this.props.handleNextLesson}>
                      <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                      More
                    </button>
                  
                  </div>

                )
              } else {
                return  <button type="button" className="list-group-item" data-index={i} onClick={this.props.handleChangeLesson}>{lesson[0][0]}</button>;
              }
            }.bind(this))
          }


          
        </div>

      </div>

	    )
  }
});

module.exports = LessonsList;