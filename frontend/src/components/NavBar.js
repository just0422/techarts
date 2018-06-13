import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavDropdown, MenuItem } from "react-bootstrap";

import { fetchTeams, fetchChecklist, selectTeam } from "../actions/generics";
import "../stylesheets/navbar.css";


const mapStateToProps = (store) => {
    return {
        ready: store.navbar.ready,
        teams: store.navbar.teams,
        campuses: store.navbar.campuses,
        currentCampus: store.navbar.currentCampus
    }
};

const mapDispatchToProps = (dispatch) => ({
    fetchTeams: () => dispatch(fetchTeams()),
    fetchChecklist: (values) => dispatch(fetchChecklist(values)),
    selectTeam: (teamId) => dispatch(selectTeam(teamId))
});


class NavigationBar extends Component {
    handleClick(teamId, event){
        this.props.selectTeam(teamId);
        this.props.fetchChecklist({
            team: teamId,
            person_name: this.props.person_name
        })
    }
    
    // Get teams from the server
    componentWillMount(){
        if (!this.props.ready)
           this.props.fetchTeams();
    }
    
    // When ready, render Nav to the screen
    render(){
        if (this.props.ready){
            var i, team, eventKey, cTeams;
            var campusTeams = {};
            const { teams, campuses } = this.props;
            
            // Map teams into { campus: [teams] } structure
            for( i = 0; i < teams.length; i++ ){
                team = teams[i];

                if (!campusTeams[team.campus])
                    campusTeams[team.campus] = [];
                campusTeams[team.campus].push(team);
            }

            // Convert each team into a <MenuItem>
            for( i = 0; i < campuses.length; i++ ){
                // Simplify teams into smaller variable;
                cTeams = campusTeams[campuses[i]];

                for(var j = 0; j < cTeams.length; j++){
                    eventKey = i.toString() + "." + j.toString();
                    team = cTeams[j];

                    cTeams[j] = <MenuItem
                                    key={eventKey} 
                                    eventKey={eventKey} 
                                    className="navbar-item"
                                    onClick={this.handleClick.bind(this, team.id)}>
                                        {team.team_name}
                                </MenuItem>;
                }
            }
            
            // Convert each campus into a <Dropdown> with <NavItem> teams
            campusTeams = campuses.map( (campus, index) => {
                return (
					<NavDropdown title={campus} key={index} id={index}
                    eventKey={i}>
						{ campusTeams[campus] }
					</NavDropdown>
                )
            })

            return (
                <div>
                    <Navbar collapseOnSelect>
                        <Navbar.Header>
                            <Navbar.Brand>
                              <a href="/">Tech Arts</a>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                            <Nav>
                                {campusTeams}
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    { this.props.children }
                </div>
            )
        }
        else return <h5>Loading</h5>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
