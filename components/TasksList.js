var React = require('react');
var ReactRouter = require('react-router');
var PropTypes = React.PropTypes;

var Quiz = require('./Quiz');

var Scorecard = React.createClass({ 

  render: function(){
    if( this.props.testSubmitted == true ) {
      if( this.props.percentage < 33 ) {
        status = "Sorry, you could not pass the test. Try again later!"
      } else {
        status = "Congratulations!! You passed the test.";
      }       
    }

    return(
      <div className="list-group">
        <div className="list-group-item active">Test Result</div>
        <div className="list-group-item">Score: <strong>{this.props.score}</strong></div>
        <div className="list-group-item">Percentage: <strong>{this.props.percentage}&nbsp;%</strong></div>
      </div>
    );
  }
});

var TasksList = React.createClass({
  propTypes: {
    lesson: PropTypes.array.isRequired,
    handleTaskComplete: PropTypes.func.isRequired
  },	
  
  getInitialState: function () {
    return {
      Quiz: false,
      QuizContent: {},
      index: 0,
      result: [0, 0]
    }
  },

  handleQuizStart: function (e) {
    var index = e.target.getAttribute('data-index'); 
    this.setState({
      index: index,
      QuizContent: this.props.lesson[index][2],
      Quiz: true
    });
  },

  handleQuizEnd: function (i, result) {
    this.props.handleTaskComplete(i, result);
    this.setState({
      Quiz: false,
      result: result
    });
  },

  render: function () {

    if (this.state.Quiz) {
      return (
        <Quiz
          details={this.state.QuizContent}
          handleQuizEnd={this.handleQuizEnd}
          index={this.state.index}
        />
      )
    } else {

    return (
    	 <div className="tasks-list">
          {
            this.props.lesson.map(function(task, i){     
              return (   
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h2 className="panel-title">{task[0]}</h2>
                        <h6>Time: {(task[0] != "Quiz") ? task[2] : task[2].time} min</h6>
                    </div>
                    <div className="panel-body">
                        <p dangerouslySetInnerHTML={{__html: task[1].replace(/\n/g, '<br>')}} />
                        {(task[0] != "Quiz") ? "" : <button type="button" className="btn btn-warning" data-index={i} onClick={this.handleQuizStart}>Start</button>}
                        <br></br><br></br>
                        {(task[0] != "Quiz") ? "" : <Scorecard score={this.state.result[0]} percentage={Math.round(this.state.result[0]*100/this.state.result[1])}/>}
                    </div>
                </div>
              )
            }.bind(this))
          } 
        </div>
	    )
  }
  }
});

module.exports = TasksList;