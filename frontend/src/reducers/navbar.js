import * as consts from "../constants";

export default function reducer(
    state={
        ready: false,
        teams: [],
        campuses: [],
        currentCampus: '',
        person_name: ''
    }, action){
    switch(action.type){
        case consts.FETCH_TEAMS_FULFILLED: {
            const { teams, campuses } = action.payload;
            return {
                ...state,
                ready: true,
                teams: teams,
                campuses: campuses
            }
        }
        case consts.SELECT_CAMPUS: {
            const { currentCampus } = action.payload;
            return {
                ...state,
                currentCampus: currentCampus
            }
        }
        default: {
            return state;
        }
    }
}
