var React = require('react');
var ReactRouter = require('react-router');
var PropTypes = React.PropTypes;

var QuestionPaper = React.createClass({

	getInitialState: function() {
		return {totalscore : 0, timeElapsed: this.props.timeAllotted};
	},

	handleChange: function(score) {
		this.setState({totalscore: this.state.totalscore + score});
	},

	handleSubmitted: function(event) {
		var result = {totalscore: this.state.totalscore};
		this.props.onSubmitted( result );
		clearInterval(this.interval);
	},

	tick: function() {
	    if( this.state.timeElapsed > 0 ) {
	        this.setState({timeElapsed: ((60*this.state.timeElapsed - 1)/60).toFixed(2)});  
	        this.props.onTimeChange( this.state.timeElapsed );
	    } else {
	        var result = {totalscore: this.state.totalscore};
				  this.props.onSubmitted( result );			
	    }
    },

    componentDidMount: function() {
      this.interval = setInterval(this.tick, 1000);
    },

    componentWillUnmount: function() {
      clearInterval(this.interval);
    },

	render: function(){
		var questionAnswers = this.props.questions.map(function(question){
			return(
				<tr><td><Question question={question.qtext} number={question.no} options={question.options} answer={question.ans} marks={question.marks} applyNegativeMarking={this.props.applyNegativeMarking} onAnswered={this.handleChange}/></td></tr>
				);
		}, this);
		return(
			<div>					
				<table className="table table-striped">{questionAnswers}</table>
				<div><input type="button" className="btn btn-primary" value="Submit" onClick={this.handleSubmitted}/></div>
			</div>
			
		);
	}
});

var Question = React.createClass({

	getInitialState: function() {
		return {
			correctAnswerRecorded: false,
			negativeAnswerRecorded: false				
		};
	},

	handleChange: function(event) {
		var score = 0;
		if( event.target.value == this.props.answer) {				
			if( this.state.correctAnswerRecorded === false ) {					
				if( this.props.applyNegativeMarking === true && this.state.negativeAnswerRecorded === true ) {
					score = 1 + this.props.marks;
				} else {
					score = this.props.marks;
				}
			}				
			this.state.correctAnswerRecorded = true;
			this.state.negativeAnswerRecorded = false;
		} else {				
			if( this.props.applyNegativeMarking === true && this.state.negativeAnswerRecorded === false ) {
				if( this.state.correctAnswerRecorded === true ) {
					score = -1 - this.props.marks;
				} else {
					score = -1;	
				}
				
			} else {
				if( this.state.correctAnswerRecorded === true ) {
					score = -this.props.marks;
				} 
			}
			this.state.negativeAnswerRecorded = true;
			this.state.correctAnswerRecorded = false;
		}
		this.props.onAnswered(score);
	},

	render: function(){
		var qname = "option" + this.props.number;
		var qoptions = this.props.options.map(function(option){
		return (
			<div><input type="radio" name={qname} value={option.text} onChange={this.handleChange}/>&nbsp;{option.text}</div>
			);
		}, this);
		return(
			<div>
				<div>{this.props.question}</div>
				<div>{qoptions}</div>
				<br/>
			</div>
		);
	}
});
	
var Stopwatch = React.createClass({

	render: function() {
		return (
		    <div className="list-group">
					<div className="list-group-item active">Time Left (In Minutes)</div>
					<div className="list-group-item"><h1>{this.props.timeElapsed}</h1></div>
				</div>
		  );
	}
});

var Quiz = React.createClass({//Pass in: (details, index, handleSubmitQuiz)

	/*
	propTypes: {
	  	details: propTypes.object.isRequired,
	  	handleQuizEnd: propTypes.func.isRequired,
	  	index: propTypes.num.isRequied
	},*/

	getInitialState: function() {
		return {
			totalscore : 0,
			quizSubmitted: false,
			timeElapsed: this.props.details.time,
			totalmarks: 0,
			first: true,
		};
	},

	handleChange: function(result) {
		this.props.handleQuizEnd(this.props.index, [result.totalscore, this.state.totalmarks]);
		this.setState({totalscore: result.totalscore, testSubmitted: true});
	},

	handleStopwatch: function( timeElapsed ) {
	  this.setState({timeElapsed: timeElapsed});
	},

	render: function(){						
		var totalmarks = 0;
		this.props.details.questions.map(function(question){
			totalmarks += question.marks;
		});
		if(this.state.first){
			this.setState({totalmarks: totalmarks, first: false});
		}

		return(
			<div>					
				<h1>{this.props.details.name}</h1>
				<hr className="divider"/>
				<div>{this.props.details.description}</div>
				<br></br>
				<table className="table">
					<tr>
						<td>
						<QuestionPaper questions={this.props.details.questions} onSubmitted={this.handleChange} onTimeChange={this.handleStopwatch} timeAllotted={this.props.details.time}/>
						 </td>
						 <td>
						  <Stopwatch timeElapsed={this.state.timeElapsed} />
						</td>
					</tr>
				</table>
			</div>
		);
	}
});

module.exports = Quiz;