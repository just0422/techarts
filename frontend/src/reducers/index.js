import { combineReducers } from "redux"
import * as consts from "../constants";

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
            const { campus, teams } = action.payload;
            return { ...state, currentCampus:campus, currentCampusTeams: teams }
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
    index
})
