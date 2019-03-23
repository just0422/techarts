import * as consts from "../constants";

export default function reducer(
    state={
        ready: false,
        teams: [],
        campuses: [],
        currentCampus: 'CTG',
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
        case consts.FETCH_CHECKLIST_FULFILLED: 
        case consts.SET_PERSON_NAME: {
            const { person } = action.payload;
            return {
              ...state,
              person_name: person
            }
        }
        default: {
            return state;
        }
    }
}
