import axios from "axios";
import { push } from  "connected-react-router";

import * as consts from "../constants";

// Select a team
export function selectTeam(team){
    return (dispatch) => {
        dispatch({
            type: consts.SELECT_TEAM,
            payload: {
                currentTeam: team
            }
        })
    }
}

// Move over to checklist page
//      values = {
//          personName: '',
//          campus: '',
//          team: 0
//      }
export function startChecklist(values){
    return (dispatch) => {
        var { person_name, team } = values;
        var url = "/checklist/" + person_name + "/" + team;
        
        dispatch({
          type: consts.SET_PERSON_NAME,
          payload: values
        })
        dispatch(push(url));
    }
}

// Gather checklist for current team from server
export function fetchChecklist(values){
    return (dispatch) => {
        var { person_name, team } = values
        var url = consts.CHECKLIST + person_name + "/" + team;

        dispatch({
            type: consts.FETCH_CHECKLIST,
            payload: values
        })

		axios.get(url)
            .then((response) => {
                const { id, person, date, team } = response.data
                dispatch({
                    type: consts.FETCH_CHECKLIST_FULFILLED, 
                    payload: {
                        id: id,
                        person: person,
                        date: date,
                        team: team
                    }
                })

            })
    }
}


// Get teams from server
export function fetchTeams(){
    return (dispatch) => {
        dispatch({type: consts.FETCH_TEAMS})

        axios.get(consts.TEAMS)
            .then((response) => {
                // Filter out unique campuses
                var campuses = [];
                var data = response.data;

                for (var i = 0; i < data.length; i++){
                    var entry = data[i];
                    if (campuses.includes(entry['campus']))
                        continue;
                    campuses.push(entry['campus'])
                }

                dispatch({
                    type: consts.FETCH_TEAMS_FULFILLED,
                    payload: {
                        ready: true,
                        teams: data,
                        campuses: campuses
                    }
                })
            })
    }
}
