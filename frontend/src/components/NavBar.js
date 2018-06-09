import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavDropdown, MenuItem } from "react-bootstrap";

import { fetchTeams } from "../actions/index";
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
    fetchTeams: () => dispatch(fetchTeams())
});


class NavigationBar extends Component {
    componentWillMount(){
        if (!this.props.ready)
           this.props.fetchTeams();
    }

    render(){
        if (this.props.ready){
            var campusTeams = {};
            const { teams, campuses } = this.props;
            
            // Map teams into { campus: [teams] } structure
            teams.map( function(team){
                if (!campusTeams[team.campus])
                    campusTeams[team.campus] = [];
                campusTeams[team.campus].push(team);
            })
            
            // Convert each team into a <NavItem>
            for(var i = 0; i < campuses.length; i++){
                campusTeams[campuses[i]] = 
                    campusTeams[campuses[i]].map( (team) => {
                        return <MenuItem key={team.id} className="navbar-item">{team.team_name}</MenuItem>
                    })
            }
            
            // Convert each campus into a <Dropdown> with <NavItem> teams
            campusTeams = campuses.map( (campus, index) => {
                return (
					<NavDropdown title={campus} key={index}>
						{ campusTeams[campus] }
					</NavDropdown>
                )
            })

            return (
				<Navbar collapseOnSelect>
					<Navbar.Header>
					    <Navbar.Brand>
						      <a href="#brand">React-Bootstrap</a>
						</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
					    <Nav>
							{campusTeams}
						</Nav>
					</Navbar.Collapse>
				</Navbar>
            )
        }
        else return <h5>Loading</h5>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
