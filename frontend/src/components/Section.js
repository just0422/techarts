import React, { Component } from 'react';

import Question from "./Question";
import "../stylesheets/section.css";

export default class Section extends Component {
    constructor(){
        super();

        this.sectionCheck = this.sectionCheck.bind(this);
        this.toggleQuestion = this.toggleQuestion.bind(this);

        this.state = {
            checkedItems: 0,
            complete: "incomplete"
        }
    }

    sectionCheck(checked){
        let checkedItems = this.state.checkedItems;
        if (checked)
            checkedItems++;
        else 
            checkedItems--;
        
        this.setState({checkedItems: checkedItems})
        if (checkedItems === this.props.questions.length)
            this.setState({complete: "complete"});
        else
            this.setState({complete: "incomplete"});
    }

    toggleQuestion(question){
        this.props.toggleQuestion(this.props.id, question)
    }

    render(){
        return (
            <div className={["section", "section-"+this.state.complete].join(' ')} >
                <div className="section-title">
                    <h2>{this.props.section_name}</h2>
                </div>
                <div className="section-question">
					{ 
                        Object.keys(this.props.questions).map( (questionId) => {
                            let question = this.props.questions[questionId];
                            return (<Question
                                        key={question.id}
                                        id={question.id}
                                        color={question.color}
                                        checked={question.checked}
                                        question_text={question.question_text}
                                        sectionCheck={this.sectionCheck}
                                        checklistItemId={question.checklistItemId}
                                        toggleQuestion={this.toggleQuestion}
                                        />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
