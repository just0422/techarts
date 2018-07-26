import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { Grid, Row, Modal, PanelGroup } from "react-bootstrap";

import NavigationBar from "./NavBar";
import Section from "./Section";
import Fixture from "./subquestions/Fixture"
import { loadData, toggleQuestion } from "../actions/checklist";
import "../stylesheets/checklist.css";

const mapStateToProps = (store) => {
    return {
        id: store.checklist.id,
        date: store.checklist.date,
        team: store.checklist.team,
        person: store.checklist.person,
        campus: store.checklist.campus,
        loading: store.checklist.loading,
        sections: store.checklist.sections,
        subquestion: store.checklist.subquestion,
        subquestionList: store.checklist.subquestionList,
        checklistReady: store.checklist.checklistReady,
        sectionsReady: store.checklist.sectionsReady,
        questionsReady: store.checklist.questionsReady,
        subquestionReady: store.checklist.subquestionReady,
        subquestionListReady: store.checklist.subquestionListReady
    }
}

const mapDispatchToProps = (dispatch) => ({
    loadData: (person, team) => dispatch(loadData(person, team)),
    toggleQuestion: (checkItem) => dispatch(toggleQuestion(checkItem))
});

class Checklist extends Component {
    constructor(){
        super();
        
        this.toggleQuestion = this.toggleQuestion.bind(this);
    }

    componentWillMount(){
        let { person_name, team } = this.props.match.params;

        this.props.loadData(person_name, team);
    }

    toggleQuestion(section, question, checked, subquestion){
        this.props.toggleQuestion({
            checklist: this.props.id, 
            section: section, 
            question: question, 
            checked: checked, 
            subquestion: subquestion,
            campus: this.props.campus
        });
    }

    loadSubquestion(list, category){
        switch(category) {
            case "lighting": {
                return (
                    <PanelGroup accordion id="fixtures-subquestion">
                    { 
                        list.map( (fixture) => {
                            return (<Fixture
                                        key={fixture.id}
                                        id={fixture.id}
                                        name={fixture.name}
                                        channel={fixture.channel}
                                        reason={fixture.reason}
                                        working={fixture.working} 
                                    />)
                        })
                    }
                    </PanelGroup>
                )
            }
            default: {
                return <p>Error!</p>
            }
        }
    }

    render(){
        let sections = <p>Loading...</p>;
        if (this.props.sectionsReady){
           sections = 
                Object.keys(this.props.sections).map( (sectionId) => { 
                    let section = this.props.sections[sectionId];
                    return (<Section 
                                key={section.id} 
                                id={section.id}
                                section_name={section.section_name}
                                questions={section.questions}
                                toggleQuestion={this.toggleQuestion}
                                />)
                })

        }
        let subquestions = <p>Loading...</p>;
        let subquestionList = this.props.subquestionList;
        let category = this.props.subquestion.category;
        if (this.props.subquestionListReady){
            subquestions = this.loadSubquestion(subquestionList, category)
        }

        return (
            <div>
                <NavigationBar />
                <Grid>
                    <Row>
                        {sections}
                    </Row>
                </Grid>
                <Modal show={this.props.subquestionReady}>
                    <Modal.Header>
                        {this.props.subquestion.title}
                    </Modal.Header>
                    <Modal.Body>
                        {subquestions}
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Checklist));
