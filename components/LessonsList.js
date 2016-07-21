var React = require('react');
var ReactRouter = require('react-router');
var PropTypes = React.PropTypes;

var LessonsList = React.createClass({
  propTypes: {
  	current_lesson: PropTypes.number.isRequired,
  	handleChangeLesson: PropTypes.func.isRequired,
    course: PropTypes.array.isRequired
  },	

  getInitialState: function () {
    return {
      
    }
  },

  componentDidMount: function () {
    //document.getElementById("main-div").childNodes[this.props.current_lesson].className = "list-group-item active";
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
                    <button type="button" className="list-group-item active" data-index={i} onClick={this.props.handleChangeLesson}>{lesson[0][0]}</button>
                    <button type="button" className="btn btn-default btn-xs">
                      <span className="glyphicon glyphicon-star" aria-hidden="true"></span>Top
                    </button>
                    <button type="button" className="btn btn-default btn-xs">
                      <span className="glyphicon glyphicon-chevron-right" aria-hidden="true" data-index={i} onClick={this.props.handleNextLesson}></span>More
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

      /*
      <div>
      <p>You chose: {this.props.current_lesson}</p>
      <div id="main-div" className="list-group">
        	<a className="list-group-item" data-index="0" onClick={this.props.handleChangeLesson}>Lesson 1</a>
          <a className="list-group-item" data-index="1" onClick={this.props.handleChangeLesson}>Lesson 2
            <span>
                <button type="button" className="btn btn-default btn-xs content-right">
                  <span className="glyphicon glyphicon-star" aria-hidden="true"></span> More...
                </button>
            </span>
          </a>
          <a className="list-group-item" data-index="2" onClick={this.props.handleChangeLesson}>Lesson 3</a>
          <a className="list-group-item" data-index="3" onClick={this.props.handleChangeLesson}>Lesson 4</a>
          <a className="list-group-item" data-index="4" onClick={this.props.handleChangeLesson}>Lesson 5</a>
        </div>
      </div>
      */
	    )
  }
});

module.exports = LessonsList;