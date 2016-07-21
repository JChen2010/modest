var React = require('react');
var ReactRouter = require('react-router');
var PropTypes = React.PropTypes;

var TasksList = React.createClass({
  propTypes: {
    lesson: PropTypes.array.isRequired	
  },	
  
  getInitialState: function () {
    return {
      Quiz: false
    }
  },

  handleQuizStart: function (e) {
    var index = e.target.getAttribute('data-index'); 
    this.setState({
      Quiz: true
    });
  },

  render: function () {
    if (this.state.Quiz) {
      return (
        <div>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h2 className="panel-title">Quiz Started!</h2>           
          </div>
          <div className="panel-body">
            Questions
          </div>
        </div>
        </div>
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