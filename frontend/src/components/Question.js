import React, { Component } from 'react';

import "../stylesheets/question.css";

export default class Question extends Component {
    constructor(){
        super();

        this.handleCheck = this.handleCheck.bind(this);
        this.stopPropogation = this.stopPropogation.bind(this);
    }

    handleCheck(event){
        this.props.toggleQuestion(this.props.id);
        this.props.sectionCheck(!this.props.checked);
    }

    stopPropogation(event){
        event.stopPropagation(); // Should prevent bubble slicks
    }

    render(){
        let color = "incomplete";
        if (this.props.color)
            color = this.props.color;
        return (
            <div className={['question', 'question-' + color].join(' ')}>
                <label className="control control-checkbox" onClick={this.handleCheck}>
					{ this.props.question_text }
					<input type="checkbox" value={this.props.checked} onClick={this.stopPropogation} />
					<div className="control_indicator"></div>
				</label> 
			</div>
        )
    }
}
