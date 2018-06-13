import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

import NavigationBar from "./NavBar";
import { fetchChecklist, fetchSections } from "../actions/checklist";

const mapStateToProps = (store) => {
    return {
        id: store.checklist.id,
        date: store.checklist.date,
        team: store.checklist.team,
        person: store.checklist.person,
        loading: store.checklist.loading,
        sections: store.checklist.sections,
        checklistReady: store.checklist.checklistReady,
        sectionsReady: store.checklist.sectionsReady
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchChecklist: (person, team) => dispatch(fetchChecklist(person, team)),
    fetchSections: (team) => dispatch(fetchSections(team))
});

class Checklist extends Component {
    componentWillMount(){
        if (!this.props.checklistReady){
            let { person_name, team } = this.props.match.params;
            this.props.fetchChecklist(person_name, team);
        }

        if (!this.props.sectionsReady){
            let { team } = this.props.match.params;
            this.props.fetchSections(team);
        }
    }

    render(){
        var sections = <p>Loading...</p>
        if (this.props.sectionsReady){
           sections = 
                this.props.sections.map( (section) => { 
                    return (<h1 key={section.id}>{section.section_name}</h1>);
                })
            
        }

        return (
            <div>
                <NavigationBar />
                <h1>{this.props.person}</h1>
                { sections }
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Checklist));
