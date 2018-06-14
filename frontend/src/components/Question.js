import React, { Component } from 'react';

import "../stylesheets/question.css"

export default class Question extends Component {
    render(){
        return (
            <div className="question">
                <label class="control control-checkbox">
					{ this.props.question_text }
					<input type="checkbox" />
					<div class="control_indicator"></div>
				</label> 
			</div>
        )
    }
}
