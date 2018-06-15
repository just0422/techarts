import React, { Component } from 'react';

import "../stylesheets/question.css"

export default class Question extends Component {
    constructor(){
        super();

        this.handleCheck = this.handleCheck.bind(this);
    }

    handleCheck(){
    }

    render(){
        return (
            <div className="question">
                <label className="control control-checkbox">
					{ this.props.question_text }
					<input type="checkbox" />
					<div className="control_indicator"></div>
				</label> 
			</div>
        )
    }
}
