import React, { Component } from 'react';

import Question from "./Question";
import "../stylesheets/section.css";

export default class Section extends Component {
    render(){
        return (
            <div className="section">
                <div className="section-title">
                    <h2>{this.props.section_name}</h2>
                </div>
                <div className="section-question">
					{ 
                        this.props.questions.map( (question, i) => {
                            return (<Question
                                        question_text={question.question_text} />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
