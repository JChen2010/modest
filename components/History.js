import React, { Component, PropTypes } from 'react';

//Build history output
function outputHistory (A) {
  var history = "";
  for (var i = 0; i < A.length; i++) {
    history = history.concat(A[i] + "<br>");
  }
  return history;
}

export default class History extends Component{

	static propTypes = {
		history: PropTypes.array.isRequired,
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
				 	dangerouslySetInnerHTML={{__html: outputHistory(this.props.history)}} />
			</div>
	    );
	}	
}