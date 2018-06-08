import React, { Component } from "react";
import { Row, Input, Button } from "react-materialize";
import { Formik } from 'formik';
import { connect } from 'react-redux';

import IndexSelect from './IndexSelect';
import { selectCampus, fetchTeams, submit } from "../actions/index"

const mapStateToProps = (store) => {
    return {
        ready: store.index.ready,
        teams: store.index.teams,
        campuses: store.index.campuses,
        currentCampus: store.index.currentCampus,
        currentCampusTeams: store.index.currentCampusTeams,
        teamDisabled: store.index.teamDisabled
    }
};

const mapDispatchToProps = (dispatch) => ({
    fetchTeams: () => dispatch(fetchTeams()),
    selectCampus: (campus, teams) => dispatch(selectCampus(campus, teams)),
    submit: (values) => dispatch(submit(values))
});

class Index extends Component {
    constructor(){
        super();

        this.handleSelectCampus = this.handleSelectCampus.bind(this);

        this.validate = this.validate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    // Handler for campus selection
    handleSelectCampus(event){
        var campus = event.target.value;
        this.props.selectCampus(campus, this.props.teams);
    }
        
    // Get team checklist
    handleSubmit(values){
        this.props.submit(values);
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
        if (!values.name)
            errors.name = "Required"

        return errors;
    }

    render(){
        var initialValues = {
            campus: '',
            team: '',
            name: ''
        }

        if (this.props.ready){
            return(
                <div>
                <h4 id="page-title">TechArts Checklists</h4>
                    <Formik
                        initialValues = { initialValues }
                        validate={ this.validate }
                        onSubmit = { this.handleSubmit }
                        render = {({ values, errors, touched, handleSubmit, handleChange, setFieldValue, handleBlur }) => (
                            <form onSubmit={handleSubmit}>
                                <IndexSelect 
                                    name="campus" 
                                    label="Campus" 
                                    handleSelect={this.handleSelectCampus} 
                                    handleBlur={handleBlur} 
                                    setFieldValue={setFieldValue} 
                                    options={this.props.campuses} 
                                    campus={true} />
                                {touched.campus && errors.campus && <div className="form-error">{errors.campus}</div>}

                                <IndexSelect 
                                    name="team" 
                                    label="Team" 
                                    handleBlur={handleBlur} 
                                    setFieldValue={setFieldValue} 
                                    options={this.props.currentCampusTeams} 
                                    campus={false} />
                                {touched.team && errors.team && <div className="form-error">{errors.team}</div>}

                                <Row>
                                    <Input 
                                        s={12} 
                                        name="name" 
                                        label="Name" 
                                        onChange={handleChange} 
                                        onBlur={handleBlur} />
                                </Row>
                                {touched.name && errors.name && <div className="form-error">{errors.name}</div>}

                                <Button 
                                    id="submit-button" 
                                    type="submit" 
                                    className="blue">
                                    Continue
                                </Button>
                            </form>
                        )} />
                </div>
            )
        }
        else {
            return <h5>Loading...</h5>;
        }
    }

    componentWillUnmount(){
        console.log("Must be getting here");
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
