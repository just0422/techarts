import React, { Component } from "react";
import { Row, Input, Button } from "react-materialize";
import ReactDOM from "react-dom";
import { Formik } from 'formik';

class IndexSelect extends Component {
    constructor(){
        super();

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.props.handleSelect(e);
        if(e.target.value == '0')
            this.props.setFieldValue(this.props.name, '')
        else
            this.props.setFieldValue(this.props.name, e.target.value)
    }

    render(){
        var options = []
        if (this.props.campus)
            options = this.props.options.map((campus) => ({ id: campus, team_name: campus }))
        else
            options = this.props.options

        return (
            <Row>
                <Input s={12} type='select' name={this.props.name} label={this.props.label} onChange={this.handleChange} onBlur={this.props.handleBlur} defaultValue='0'>
                    <option disabled value='0'>--Select a {this.props.label}--</option>
                    { options.map((option) => (<option value={option.id} key={Math.floor(Math.random() * Math.floor(10000))}>{option.team_name}</option>)) }
                </Input>
            </Row>
        )
    }
}

class Index extends Component {
    constructor(){
        super();

        this.state = {
            ready: false,
            teams: [],
            campuses: [],
            currentCampus: '',
            currentCampusTeams: [],
            teamDisabled: true
        }

        this.handleSelectCampus = this.handleSelectCampus.bind(this);
        this.handleSelectTeam = this.handleSelectTeam.bind(this);

        this.validate = this.validate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSelectCampus(event){
        var campus = event.target.value

        var currentCampusTeams = [];
        for(var i = 0; i < this.state.teams.length; i++)
        {
            var team = this.state.teams[i];

            if (team['campus'] === campus)
                currentCampusTeams.push(team);
        }

        this.setState({
            currentCampus: campus,
            currentCampusTeams: currentCampusTeams
        })
    }

    handleSelectTeam(event){
    }

    componentWillMount(){
        fetch("http://127.0.0.1:8000/api/teams")
            .then(response => {
                return response.json();
            })
            .then(data => {

                var campuses = [];

                for (var i = 0; i < data.length; i++){
                    var entry = data[i];
                    if (campuses.includes(entry['campus']))
                        continue;
                    campuses.push(entry['campus'])
                }

                this.setState({ready: true, teams: data, campuses: campuses})
            })
    }

    validate(values){
        console.log("Validate ")
        console.log(values)

        var errors = {}
        if (!values.campus)
            errors.campus = "Required"
        if (!values.team)
            errors.team = "Required"
        if (!values.name)
            errors.name = "Required"

        return errors;
    }

    handleSubmit(values){
    }

    render(){
        var initialValues = {
            campus: '',
            team: '',
            name: ''
        }
        if (this.state.ready){
            return(
                <Formik
                    initialValues = { initialValues }
                    validate={ this.validate }
                    onSubmit = { this.handleSubmit }
                    render = {({ values, errors, touched, handleSubmit, handleChange, setFieldValue, handleBlur }) => (
                        <form onSubmit={handleSubmit}>
                            <IndexSelect name="campus" label="Campus" handleSelect={this.handleSelectCampus} handleBlur={handleBlur} setFieldValue={setFieldValue} options={this.state.campuses} campus={true} disabled={false} />
                            {touched.campus && errors.campus && <div className="form-error">{errors.campus}</div>}

                            <IndexSelect name="team" label="Team" handleSelect={this.handleSelectTeam} handleBlur={handleBlur} setFieldValue={setFieldValue} options={this.state.currentCampusTeams} campus={false} />
                            {touched.team && errors.team && <div className="form-error">{errors.team}</div>}

                            <Row><Input s={12} name="name" label="Name" onChange={handleChange} onBlur={handleBlur} /></Row>
                            {touched.name && errors.name && <div className="form-error">{errors.name}</div>}

                            <Button id="submit-button" type = "submit" className="blue" >Continue</Button>
                        </form>
                    )} />
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

var wrapper = document.getElementById("index-page")
wrapper ? ReactDOM.render(<Index />, wrapper) : null;
