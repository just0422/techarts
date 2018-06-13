import * as consts from "../constants"

export default function reducer(
    state={
        id: -1,
        date: '',
        team: '',
        person: '',
        loading: false,
        checklistReady: false
    }, action){
    switch(action.type){
        case consts.FETCH_CHECKLIST: {
            return {
                ...state,
                loading: true 
            }
        }
        case consts.FETCH_CHECKLIST_FULFILLED: {
            const { id, person, date, team } = action.payload;
            return {
                ...state,
                id: id,
                person: person,
                date: date,
                team: team,
                checklistReady: true
            }
        }
        default:
            return state
    }
}
