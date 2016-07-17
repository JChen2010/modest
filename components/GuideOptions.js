import React, { Component, PropTypes } from 'react';

export default class GuideOptions extends Component{

	static propTypes = {
		guide_number: PropTypes.string.isRequired,

		handleVT: PropTypes.func.isRequired, //task submit
		handleAG: PropTypes.func.isRequired, //guide submit
		handleEG: PropTypes.func.isRequired, //guide submit

		handleNC: PropTypes.func.isRequired, //task title change
	};

	static defaultProps = {};

	constructor (props, context) {
		super(props, context);
		this.handleViewTasks = this.handleViewTasks.bind(this);
		this.handleAddGuide = this.handleAddGuide.bind(this);
		this.handleEditGuide = this.handleEditGuide.bind(this);
		this.handleNumberChange = this.handleNumberChange.bind(this);
	}

	handleViewTasks (e) {
	    e.preventDefault();
	   	this.props.handleVT(this.props.guide_number);
  	}

  	handleAddGuide (e) {
  		e.preventDefault();
		this.props.handleAG(this.props.guide_number);
  	}

	handleEditGuide (e) {
		e.preventDefault();
	    this.props.handleEG(this.props.guide_number);
  	}

  	//Lesson #
  	handleNumberChange (e) {
		this.props.handleNC(e.target.value);
  	}

	render () {
	    return (
	    	<div>
				{/*Guide Options*/}
				Lesson #:&nbsp;
				<input
				style={{width: '50px'}}
				type="text"
				guide_number={this.props.guide_number}
				onChange={this.handleNumberChange}
				/> 
				<form onSubmit={this.handleViewTasks}>
				<input
				    type="submit"
				    value="View Tasks  "/>
				</form>
				<form onSubmit={this.handleAddGuide}>
				<input
				    type="submit"
				    value="Add Lesson "/>
				</form>
				<form onSubmit={this.handleEditGuide}>
				<input
				    type="submit"
				    value="Edit Lesson "/>
				</form>
			</div>
	    );
	}	
}