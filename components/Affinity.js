var React = require('react');
var ReactRouter = require('react-router');
var PropTypes = React.PropTypes;

var Affinity = React.createClass({
  propTypes: {
    current_lesson: PropTypes.number.isRequired,
    course: PropTypes.array.isRequired,
    altLessonsIndex: PropTypes.array.isRequired,
    //user: PropTypes.object.isRequired
  },  
 
  render: function () {

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
        <div>
          {affinityButton}
        </div>
      )
  }
});

module.exports = Affinity;