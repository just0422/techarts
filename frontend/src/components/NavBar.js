import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, NavItem, Dropdown, Button, Row } from "react-materialize";

import { fetchTeams } from "../actions/index";

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
                        return <NavItem key={team.id}>{team.team_name}</NavItem>
                    })
            }
            
            // Convert each campus into a <Dropdown> with <NavItem> teams
            campusTeams = campuses.map( (campus, index) => {
                return (
                    <Row key={index}>
                        <Dropdown trigger={ <Button>{campus}</Button> } >
                            { campusTeams[campus] }
                        </Dropdown>
                    </Row>
                )
            })

            return (
                <Navbar brand="TechArts" right className="blue">
                    {campusTeams}
                </Navbar>
            )
        }
        else return <h5>Loading</h5>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
