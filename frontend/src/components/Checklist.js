import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import ReactSwipe from 'react-swipe';

import NavigationBar from "./NavBar";
import Section from "./Section";
import { fetchChecklist, fetchSections, fetchQuestions } from "../actions/checklist";
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
    fetchChecklist: (person, team) => dispatch(fetchChecklist(person, team)),
    fetchSections: (team) => dispatch(fetchSections(team)),
    fetchQuestions: (team) => dispatch(fetchQuestions(team))
});

class Checklist extends Component {
    componentWillMount(){
        let { team } = this.props.match.params;

        if (!this.props.checklistReady){
            let { person_name } = this.props.match.params;
            this.props.fetchChecklist(person_name, team);
        }

        if (!this.props.sectionsReady){
            this.props.fetchSections(team);
        }

        if (!this.props.questionReady){
            this.props.fetchQuestions(team);
        }
    }

    render(){
        let sections = <p>Loading...</p>
        if (this.props.sectionsReady){
           sections = 
                this.props.sections.map( (section) => { 
                    let questions = [];
                    for (let i = 0; i < this.props.questions.length; i++)
                        if (this.props.questions[i].section === section.id)
                            questions.push(this.props.questions[i])

                    return (<Section 
                                id={section.id}
								section_name={section.section_name}
                                questions={questions}
                                key={section.id} /> )
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
