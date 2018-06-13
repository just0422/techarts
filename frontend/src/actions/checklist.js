import axios from "axios";

import * as consts from "../constants"

// Gather checklist for current team from server
export function fetchChecklist(person_name, team){
    return (dispatch) => {
        dispatch({ type: consts.FETCH_CHECKLIST })
        
        var url = "/checklist/" + person_name + "/" + team;
		axios.get("/api" + url)
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

