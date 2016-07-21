var React = require('react');
var ReactRouter = require('react-router');
var PropTypes = React.PropTypes;

var LessonsList = React.createClass({
  propTypes: {
  	current_lesson: PropTypes.number.isRequired,
  	handleChangeLesson: PropTypes.func.isRequired,
    handleNextLesson: PropTypes.func.isRequired,
    course: PropTypes.array.isRequired,
    altLessonsIndex: PropTypes.array.isRequired,
    handleTopRec: PropTypes.func.isRequired
    //user: PropTypes.object.isRequired
  },	
 
  render: function () {

    return (
    	<div>
        <div className="list-group">
          {
            this.props.course.map(function(lesson, i){
              if (i == this.props.current_lesson) {

                //Find affinity rating (expected rating/5 * 100)
                var affinityScore;
                if(this.props.user.courses[0].recs[this.props.current_lesson][this.props.altLessonsIndex[this.props.current_lesson]] != 0){
                  affinityScore = "Affinity: ";
                  var score = Math.round(this.props.user.courses[0].recs[this.props.current_lesson][this.props.altLessonsIndex[this.props.current_lesson]]*100/5);
                  affinityScore = affinityScore.concat(score.toString());

                  var affinityButton;
                  if (score >= 70){
                    affinityButton =
                      <button type="button" className="btn btn-success btn-xs">
                          {affinityScore}
                      </button>
                  } else if (score >= 40) {
                    affinityButton =
                      <button type="button" className="btn btn-warning btn-xs">
                            {affinityScore}
                      </button>
                  }
                  else{
                    affinityButton =
                      <button type="button" className="btn btn-danger btn-xs">
                            {affinityScore}
                      </button>
                  }

                } else {
                  affinityScore = "Rating: ";
                  var score = this.props.user.courses[0].ratings[this.props.current_lesson][0];
                  affinityScore = affinityScore.concat((this.props.user.courses[0].ratings[this.props.current_lesson][0]).toString());

                  var affinityButton;
                  if (score >= 4){
                    affinityButton =
                      <button type="button" className="btn btn-success btn-xs">
                          {affinityScore}
                      </button>
                  } else if (score >= 2) {
                    affinityButton =
                      <button type="button" className="btn btn-warning btn-xs">
                            {affinityScore}
                      </button>
                  }
                  else{
                    affinityButton =
                      <button type="button" className="btn btn-danger btn-xs">
                            {affinityScore}
                      </button>
                  }
                }

                return (
                  <div style={{display: "flex"}}>
                    {affinityButton}
                    <button type="button" className="list-group-item active" data-index={i} onClick={this.props.handleChangeLesson}>{lesson[this.props.altLessonsIndex[i]][0]}</button>
                    <button type="button" className="btn btn-default btn-xs" onClick={this.props.handleTopRec}>
                      <span className="glyphicon glyphicon-star" aria-hidden="true"></span>Top Rec
                    </button>
                    <button type="button" className="btn btn-default btn-xs" data-index={i} onClick={this.props.handleNextLesson}>
                      {/*<span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>*/}
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