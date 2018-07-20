import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { Grid, Row } from "react-bootstrap";

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
        checklistReady: store.checklist.checklistReady,
        sectionsReady: store.checklist.sectionsReady,
        questionsReady: store.checklist.questionsReady
    }
}

const mapDispatchToProps = (dispatch) => ({
    loadData: (person, team) => dispatch(loadData(person, team)),
    toggleQuestion: (checklistId, section, question, checked) => dispatch(toggleQuestion(checklistId, section, question, checked))
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

    toggleQuestion(section, question, checked){
        this.props.toggleQuestion(this.props.id, section, question, checked);
    }

    render(){
        console.log("rendering");
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
            return (
                <div>
                    <NavigationBar />
                    <Grid>
                        <Row>
                            {sections}
                        </Row>
                    </Grid>
                </div>
            );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Checklist));
