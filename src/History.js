import React, { Component, PropTypes } from 'react';

export default class History extends Component{

	static propTypes = {
		history: PropTypes.string.isRequired,
	};

	static defaultProps = {};

	constructor (props, context) {
		super(props, context);
	}

	render () {
	    return (
	    	<div>
				<br></br>
				<p><b>History:</b></p>
				<p className="box2"
				 	dangerouslySetInnerHTML={{__html: outputHistory(this.state.history)}} />
			</div>
	    );
	}	
}