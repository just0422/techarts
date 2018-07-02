import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import ReactSwipe from 'react-swipe';

import NavigationBar from "./NavBar";
import Section from "./Section";
import { loadData, toggleQuestion } from "../actions/checklist";
import "../stylesheets/checklist.css";

const mapStateToProps = (store) => {
    return {
        id: store.checklist.id,
        date: store.checklist.date,
        team: store.checklist.team,
        person: store.checklist.person,
        loading: store.checklist.loading,
        sections: store.checklist.sections,
        questions: store.checklist.questions,
        checklistReady: store.checklist.checklistReady,
        sectionsReady: store.checklist.sectionsReady,
        questionsReady: store.checklist.questionsReady
    }
}

const mapDispatchToProps = (dispatch) => ({
    loadData: (person, team) => dispatch(loadData(person, team)),
    toggleQuestion: (question) => dispatch(toggleQuestion(question))
});

class Checklist extends Component {
    componentWillMount(){
        let { person_name, team } = this.props.match.params;

        this.props.loadData(person_name, team);
    }

    render(){
        let sections = <p>Loading...</p>
        if (this.props.sectionsReady){
           sections = 
                this.props.sections.map( (section) => { 
                    let questions = [];
                    for (let id in this.props.questions)
                        if (this.props.questions[id].section === section.id)
                            questions.push(this.props.questions[id])

                    return (<Section 
                                key={section.id} 
                                id={section.id}
								section_name={section.section_name}
                                questions={questions}
                                toggleQuestion={this.props.toggleQuestion}
                                />
                            )
                })
        }

        return (
            <div>
                <NavigationBar />
                <ReactSwipe ref={reactSwipe => this.reactSwipe = reactSwipe} swipeOptions={{continuous:false}}>
                    { sections }
                </ReactSwipe>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Checklist));
