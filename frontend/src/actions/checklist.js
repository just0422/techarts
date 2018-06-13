import axios from "axios";

import * as consts from "../constants"

// Gather checklist for current team from server
export function fetchChecklist(person_name, team){
    return (dispatch) => {
        dispatch({ type: consts.FETCH_CHECKLIST })
        
        var url = "/api/checklist/" + person_name + "/" + team;
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

export function fetchSections(team){
    return (dispatch) => {
        dispatch({ type: consts.FETCH_SECTIONS })

        var url = "/api/sections/" + team;
        axios.get(url)
            .then((response) => {
                dispatch({
                    type: consts.FETCH_SECTIONS_FULFILLED,
                    payload: {
                        sections: response.data
                    }
                })
            })
    }
}
