import React, { Component } from 'react';

import "../stylesheets/question.css";

export default class Question extends Component {
    constructor(){
        super();

        this.handleCheck = this.handleCheck.bind(this);
        this.stopPropogation = this.stopPropogation.bind(this);
    }

    handleCheck(event){
        this.props.toggleQuestion(this.props.id, !this.props.checked, this.props.subquestion);
    }

    stopPropogation(event){
        event.stopPropagation(); // Should prevent bubble slicks
    }

    render(){
        return (
            <div className={['question', 'question-' + this.props.color].join(' ')}>
                <label className="control control-checkbox" onClick={this.handleCheck}>
					{ this.props.question_text }
					<input type="checkbox" defaultChecked={this.props.checked} onClick={this.stopPropogation} />
					<div className="control_indicator"></div>
				</label> 
			</div>
        )
    }
}
