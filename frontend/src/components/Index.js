import React, { Component } from "react";
import { Row, Input } from "react-materialize";
import ReactDOM from "react-dom";

class IndexSelect extends Component {
    constructor(){
        super();
    }

    render(){
        var options = []
        if (this.props.campus)
            options = this.props.options.map((campus) => ({ id: campus, team_name: campus }))
        else
            options = this.props.options

        return (
            <Row>
                <Input s={12} type='select' label={this.props.label} onChange={this.props.handleSelect} defaultValue='0'>
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

    render(){
        if (this.state.ready){
            return(
                <div>
                    <IndexSelect label="Campus" handleSelect={this.handleSelectCampus} options={this.state.campuses} campus={true} disabled={false} />
                    <IndexSelect label="Team" handleSelect={this.handleSelectTeam} options={this.state.currentCampusTeams} campus={false} />
                    <Row>
                        <Input s={12} label="Name" />
                    </Row>
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

var wrapper = document.getElementById("index-page")
wrapper ? ReactDOM.render(<Index />, wrapper) : null;
