import React, { Component } from 'react';

import "../stylesheets/question.css";

export default class Question extends Component {
    constructor(){
        super();

        this.handleCheck = this.handleCheck.bind(this);
        this.stopPropogation = this.stopPropogation.bind(this);

        this.state = {
            checked : false,
            checkedColor: "incomplete"
        }
    }

    handleCheck(event){
        let checked = !this.state.checked;
        let checkedColor = checked ? "complete" : "incomplete";

        this.setState({ 
            checked : checked,
            checkedColor: checkedColor
        })
    }

    stopPropogation(event){
        event.stopPropagation(); // Should prevent bubble slicks
    }

    render(){
        return (
            <div className={['question', 'question-'+this.state.checkedColor].join(' ')}>
                <label className="control control-checkbox" onClick={this.handleCheck}>
					{ this.props.question_text }
					<input type="checkbox" value={this.state.checked} onClick={this.stopPropogation} />
					<div className="control_indicator"></div>
				</label> 
			</div>
        )
    }
}
