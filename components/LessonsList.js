var React = require('react');
var ReactRouter = require('react-router');
var PropTypes = React.PropTypes;

var Affinity = require('./Affinity');

var styles = require('../styles/index');

var LessonsList = React.createClass({
  propTypes: {
  	current_lesson: PropTypes.number.isRequired,
  	handleChangeLesson: PropTypes.func.isRequired,
    handleChangeAlternative: PropTypes.func.isRequired,
    course: PropTypes.array.isRequired,
    altLessonsIndex: PropTypes.array.isRequired,
    handleTopRec: PropTypes.func.isRequired
    //user: PropTypes.object.isRequired
  },


 
  render: function () {

    return (
    	<div>
        <div className="btn-group-vertical" id="lessons-list" role="group" aria-label="Lessons">
          {
            this.props.course.map(function(lesson, i){
              if (i == this.props.current_lesson) {
                return (
                  <div className="btn-group" role="group">
                    <button type="button" className="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <strong>{i+1}</strong>: {lesson[this.props.altLessonsIndex[i]][0] + "   "}
                      <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu">
                      {
                        lesson.map(function(alternative, j){
                          return <li role="button"><a data-les-index={i} data-alt-index={j} onClick={this.props.handleChangeAlternative}>{alternative[0]}</a></li>
                        }.bind(this))
                      }
                    </ul>
                  </div>
                )
              } else {
                return (
                  <div className="btn-group" role="group">
                    <button type="button" className="btn btn-default" data-index={i} onClick={this.props.handleChangeLesson}>
                      <strong>{i+1}</strong>: {lesson[0][0]}
                    </button>
                  </div>
                )
              }
            }.bind(this))
          }
        </div>
      </div>
	    )
  }
});

module.exports = LessonsList;