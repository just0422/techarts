import axios from "axios";

import * as consts from "../constants";

// Select teams associated with campus
export function selectCampus(campus, teams){
    return (dispatch) => {
        var currentCampusTeams = [];
        for(var i = 0; i < teams.length; i++)
        {
            var team = teams[i];

            if (team['campus'] === campus)
                currentCampusTeams.push(team);
        }

        dispatch({
            type: consts.SELECT_CAMPUS,
            payload: {
                currentCampus: campus,
                currentCampusTeams: currentCampusTeams
            }
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
