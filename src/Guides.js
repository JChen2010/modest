import React, { Component, PropTypes } from 'react';

//Build task list output
function outputTasks (A) {
  var taskList = "";
  for (var i = 0; i < A.length; i++) {
    taskList = taskList.concat(`Task ${i + 1}: ` + A[i][0] + "<br>" + A[i][1] + "<br><br>");
  }
  return taskList;
}

export default class Guides extends Component{

	static propTypes = {
		task_title: PropTypes.string.isRequired,
		task_details: PropTypes.string.isRequired,
		tasks: PropTypes.array.isRequired,
		available_tasks: PropTypes.array.isRequired,

		title_submit: PropTypes.string.isRequired,
		details_submit: PropTypes.string.isRequired,

		guide_title: PropTypes.string.isRequired,
		guide_submit: PropTypes.string.isRequired,
		guides: PropTypes.array.isRequired,

		handleTS: PropTypes.func.isRequired, //task submit
		handleGS: PropTypes.func.isRequired, //guide submit

		handleTC: PropTypes.func.isRequired, //task title change
		handleDC: PropTypes.func.isRequired, //task details change
		handleGC: PropTypes.func.isRequired //guide title change
	};

	static defaultProps = {};

	constructor (props, context) {
		super(props, context);
		this.handleTaskSubmit = this.handleTaskSubmit.bind(this);
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleDetailsChange = this.handleDetailsChange.bind(this);
		this.handleGuideSubmit = this.handleGuideSubmit.bind(this);
		this.handleGuideChange = this.handleGuideChange.bind(this);
	}

	//OnSubmit In Task submission form
	handleTaskSubmit (e) {
	    e.preventDefault();
	   	this.props.handleTS(this.props.task_title.trim(),
	   		this.props.task_details.trim());
  	}

  	//OnChange - Task title in task submission form
  	handleTitleChange (e) {
  		var x = this.propTypes;
		this.props.handleTC(e.target.value);
  	}

	//OnChange - Task Details input in Task submit
	handleDetailsChange (e) {
	    this.props.handleDC(e.target.value);
  	}

	//OnSubmit in Guide submission form
	handleGuideSubmit (e) {
	    e.preventDefault();
	    this.props.handleGS(this.props.guide_title.trim(), this.props.tasks);
  	}

  	//Onchange - guide_title input in Guide Submission form
  	handleGuideChange (e) {
		this.props.handleGC(e.target.value);
  	}

	render () {
	    return (
	      <div>
	        {/*----- Guide Entry -----*/}
	        <br></br>
	        <b>Lesson Planning</b>
	        <hr></hr>

	        {/*----- Task Submission -----*/}
	        <form onSubmit={this.handleTaskSubmit}>
	          <div>Task Title: </div>
	          <input
	            type="text"
	            task_title={ this.props.task_title }
	            onChange={ this.handleTitleChange }
	          />
	          <br></br><br></br>
	          <div>Task Details: </div> 
	          <textarea
	            className="clear2"
	            task_details={this.props.task_details}
	            onChange={this.handleDetailsChange} 
	            rows="3"
	            cols="50"
	            style={{overflow: 'auto', resize: 'none'}}
	          /><br></br><br></br>
	          <input type="submit" value="Add Task"/>
	        </form><br></br>

	        {/*----- Guide Submission -----*/}
	        <p>Current Lesson:</p>
	        <p className="box"
	          dangerouslySetInnerHTML={{__html: outputTasks(this.props.tasks)}} />
	        <form onSubmit={this.handleGuideSubmit}> 
	          <div>Lesson Title: </div>
	          <input
	            type="text"
	            guide_title={this.props.guide_title}
	            onChange={this.handleGuideChange}
	          /><br></br><br></br>
	          <input type="submit" value="Submit Lesson"/>
	        </form><br></br><br></br>
	       </div>
	    );
	}	
}