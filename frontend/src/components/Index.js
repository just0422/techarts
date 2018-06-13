import React, { Component } from "react";
import { withRouter } from 'react-router-dom'
import { Grid, Row, FormGroup, ControlLabel, FormControl, Button, Col } from "react-bootstrap";
import { Formik } from 'formik';
import { connect } from 'react-redux';

import IndexSelect from './IndexSelect';
import { selectCampus } from "../actions/index"
import { selectTeam, fetchTeams, fetchChecklist } from "../actions/generics"

const mapStateToProps = (store) => {
    return {
        ready: store.index.ready,
        teams: store.index.teams,
        campuses: store.index.campuses,
        currentTeam: store.index.currentTeam,
        currentCampus: store.index.currentCampus,
        currentCampusTeams: store.index.currentCampusTeams,
        teamDisabled: store.index.teamDisabled
    }
};

const mapDispatchToProps = (dispatch) => ({
    fetchTeams: () => dispatch(fetchTeams()),
    fetchChecklist: (values) => dispatch(fetchChecklist(values)),
    selectTeam: (team) => dispatch(selectTeam(team)),
    selectCampus: (campus, teams) => dispatch(selectCampus(campus, teams))
});

class Index extends Component {
    constructor(){
        super();

        this.handleSelectCampus = this.handleSelectCampus.bind(this);
        this.handleSelectTeam = this.handleSelectTeam.bind(this);

        this.validate = this.validate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    // Handler for campus selection
    handleSelectCampus(event){
        var campus = event.target.value;
        this.props.selectCampus(campus, this.props.teams);
    }
    
    // Handler for team selection
    handleSelectTeam(event){
        var team = event.target.value;
        this.props.selectTeam(team);
    }
        
    // Get team checklist
    handleSubmit(values){
        this.props.fetchChecklist(values)
    }
    
    // Get campuses and teams
    componentWillMount(){
        this.props.fetchTeams();
    }
    
    // Form Validation
    validate(values){
        var errors = {}
        if (!values.campus)
            errors.campus = "Required"
        if (!values.team)
            errors.team = "Required"
        if (!values.person_name)
            errors.person_name = "Required"

        return errors;
    }

    render(){
        var initialValues = {
            campus: '',
            team: '',
            person_name: ''
        }

        if (this.props.ready){
            return(
                <div>
                <h1 id="page-title" className="display-4">TechArts Checklists</h1>
				<Grid>
                    <Formik
                        initialValues = { initialValues }
                        validate={ this.validate }
                        onSubmit = { this.handleSubmit }
                        render = {({ values, errors, touched, handleSubmit, handleChange, setFieldValue, handleBlur }) => (
                            <form onSubmit={handleSubmit}>
                                <Row className="index-form-row">
                                    <Col xs={12}>
                                        <IndexSelect 
                                            name="campus" 
                                            label="Campus" 
                                            handleSelect={this.handleSelectCampus} 
                                            handleBlur={handleBlur} 
                                            setFieldValue={setFieldValue} 
                                            options={this.props.campuses} 
                                            value={this.props.currentCampus}
                                            campus={true} />
                                    </Col>
                                    {   
                                        touched.campus && errors.campus && 
                                        <Col xs={12}>
                                            <div className="form-error">
                                                {errors.campus}
                                            </div>
                                        </Col>
                                    }
                                </Row>
                            
                                <Row className="index-form-row">
                                    <Col xs={12}>
                                        <IndexSelect 
                                            name="team" 
                                            label="Team" 
                                            handleSelect={this.handleSelectTeam} 
                                            handleBlur={handleBlur} 
                                            setFieldValue={setFieldValue} 
                                            options={this.props.currentCampusTeams} 
                                            value={this.props.currentTeam}
                                            campus={false} />
                                    </Col>
                                    {
                                        touched.team && errors.team && 
                                        <Col xs={12}>
                                            <div className="form-error">
                                                {errors.team}
                                            </div>
                                        </Col>
                                    }
                                </Row>

                                <Row className="index-form-row">
                                    <Col xs={12}>
                                        <FormGroup bsSize="lg" controlId="person_name">
                                            <ControlLabel>Name</ControlLabel>
                                            <FormControl
                                                xs={12}
                                                type="text"
                                                onChange={handleChange} 
                                                onBlur={handleBlur} />
                                        </FormGroup>
                                    </Col>

                                    {
                                        touched.person_name && errors.pseron_name && 
                                        <Col xs={12}>
                                            <div className="form-error">
                                                {errors.person_name}
                                            </div>
                                        </Col>
                                    }
                                </Row>
                                
                                <Row className="index-form-row">
                                    <Col xs={12}>
                                        <Button 
                                            id="submit-button" 
                                            type="submit" 
                                            bsStyle="primary"
                                            bsSize="large">
                                            Continue
                                        </Button>
                                    </Col>
                                </Row>
                            </form>
                        )} />
    				</Grid>
                </div>
            )
        }
        else {
            return <h5>Loading...</h5>;
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));
