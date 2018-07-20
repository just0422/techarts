import React, { Component } from 'react';
import { Col } from "react-bootstrap";

import Question from "./Question";
import "../stylesheets/section.css";

export default class Section extends Component {
    constructor(props){
        super(props);

        this.toggleQuestion = this.toggleQuestion.bind(this);
        
        let checkedItems = 0;
        let complete = "incomplete";
        for(var id in this.props.questions)
            if (this.props.questions[id].checked)
                checkedItems++;

        if (checkedItems === Object.keys(this.props.questions).length)
            complete = "complete";

        this.state = {
            checkedItems: checkedItems,
            complete: complete
        }
    }
    
    toggleQuestion(question, checked){
        let checkedItems = this.state.checkedItems;
        if (checked)
            checkedItems++;
        else 
            checkedItems--;
        
        this.setState({checkedItems: checkedItems})
        if (checkedItems === Object.keys(this.props.questions).length)
            this.setState({complete: "complete"});
        else
            this.setState({complete: "incomplete"});

        this.props.toggleQuestion(this.props.id, question, checked)
    }

    render(){
        return (
            <Col xs={12} sm={6} md={4} className={["section", "section-"+this.state.complete].join(' ')} >
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
                                        checklistItemId={question.checklistItemId}
                                        toggleQuestion={this.toggleQuestion}
                                        />
                            )
                        })
                    }
                </div>
            </Col>
        )
    }
}
