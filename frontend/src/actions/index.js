import * as consts from "../constants";

// Gather teams associated with campus
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
