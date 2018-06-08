import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import * as consts from "../constants";
import checklist from "./checklist";
import navbar from "./navbar";

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
        // Store selected campus and associated teams
        case consts.SELECT_CAMPUS: {
            const { currentCampus, currentCampusTeams } = action.payload;
            return { 
                ...state, 
                currentCampus: currentCampus, 
                currentCampusTeams: currentCampusTeams 
            }
        }
        default:
            return state;
    }
}

export default combineReducers({
    index,
    checklist,
    navbar
})
