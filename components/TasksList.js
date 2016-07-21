var React = require('react');
var ReactRouter = require('react-router');
var PropTypes = React.PropTypes;

var TasksList = React.createClass({
  propTypes: {
    lesson: PropTypes.array.isRequired	
  },	
 
  render: function () {
    return (
    	 <div className="tasks-list">
          {
            this.props.lesson.map(function(task){     
              return (   
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h2 className="panel-title">{task[0]}</h2>
                        <h6>Time: {task[2]} min</h6>
                    </div>
                    <div className="panel-body">
                        <p dangerouslySetInnerHTML={{__html: task[1].replace(/\n/g, '<br>')}} />
                    </div>
                </div>
              )
            })
          }

          
            
        </div>

  
	    )
  }
});

module.exports = TasksList;