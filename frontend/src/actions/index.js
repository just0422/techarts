import axios from "axios";

import * as consts from "../constants";

// Select teams associated with campus
export function selectCampus(campus){
    return (dispatch) => {
        var currentCampusTeams = [];
        for(var i = 0; i < this.state.teams.length; i++)
        {
            var team = this.state.teams[i];

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

export function fetchTeams(){
    return (dispatch) => {
        dispatch({type: consts.FETCH_TEAMS})

        axios.get(consts.TEAMS)
            .then((response) => {
                var campuses = [];

                for (var i = 0; i < response.length; i++){
                    var entry = response[i];
                    if (campuses.includes(entry['campus']))
                        continue;
                    campuses.push(entry['campus'])
                }

                dispatch({
                    type: consts.FETCH_TEAMS_FULFILLED,
                    payload: {
                        ready: true,
                        teams: response,
                        campuses: campuses
                    }
                })
            })
    }
}
