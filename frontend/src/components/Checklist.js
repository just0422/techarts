import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

import NavigationBar from "./NavBar";
import { fetchChecklist } from "../actions/checklist";

const mapStateToProps = (store) => {
    return {
        id: store.checklist.id,
        date: store.checklist.date,
        team: store.checklist.team,
        person: store.checklist.person,
        loading: store.checklist.loading,
        checklistReady: store.checklist.checklistReady
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchChecklist: (person, team) => dispatch(fetchChecklist(person, team))
});

class Checklist extends Component {
    componentWillMount(){
        console.log(this.props);
        if (!this.props.checklistReady){
            var { person_name, team } = this.props.match.params;
            this.props.fetchChecklist(person_name, team);
        }
    }

    render(){
        return (
            <div>
                <NavigationBar />
                <h1>{this.props.person}</h1>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Checklist));
