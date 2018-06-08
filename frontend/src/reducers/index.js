import { combineReducers } from "redux";
import * as consts from "../constants";

import checklist from "./checklist";

function index(
    state={
        ready: false,
        loading: false,
        teams: [],
        campuses: [],
        currentCampus: '',
        currentCampusTeams: [],
        teamDisabled: true
    }, action){
    switch(action.type){
        // Store selected campus and associated teams
        case consts.SELECT_CAMPUS: {
            const { currentCampus, currentCampusTeams } = action.payload;
            return { 
                ...state, 
                currentCampus: currentCampus, 
                currentCampusTeams: currentCampusTeams 
            }
        }
        // Get teams from server
        case consts.FETCH_TEAMS: {
            return { ...state, loading: true };
        }
        // Got teams from server
        case consts.FETCH_TEAMS_FULFILLED: {
            const { ready, teams, campuses } = action.payload;
            return { 
                ...state,
                loading: false,
                ready: ready,
                teams: teams,
                campuses: campuses
            }
        }
        default:
            return state;
    }
}

export default combineReducers({
    index,
    checklist
})
