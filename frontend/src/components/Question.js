import React, { Component } from 'react';

import "../stylesheets/question.css"

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
        event.stopPropagation(); // Should stop bubble slicks
        event.nativeEvent.stopImmediatePropagation();
        console.log("Once?");

        if (this.state.checked){
            this.setState({ 
                checked : false,
                checkedColor: "incomplete"
            })
        }
        else{
            this.setState({ 
                checked : true,
                checkedColor: "complete"
            })
        }
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
