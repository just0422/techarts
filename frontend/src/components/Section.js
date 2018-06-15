import React, { Component } from 'react';

import Question from "./Question";
import "../stylesheets/section.css";

export default class Section extends Component {
    constructor(){
        super();

        this.sectionCheck = this.sectionCheck.bind(this);

        this.state = {
            checkedItems: 0,
            complete: "incomplete"
        }
    }

    sectionCheck(checked){
        let checkedItems = this.state.checkedItems;
        if (checked)
            checkedItems++;
        
        this.setState({checkedItems: checkedItems})
        if (checkedItems == this.props.questions.length)
            this.setState({complete: "complete"});
    }


    render(){
        return (
            <div className={["section", "section-"+this.state.complete].join(' ')} >
                <div className="section-title">
                    <h2>{this.props.section_name}</h2>
                </div>
                <div className="section-question">
					{ 
                        this.props.questions.map( (question) => {
                            return (<Question
                                        key={question.id}
                                        question_text={question.question_text}
                                        sectionCheck={this.sectionCheck}/>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
