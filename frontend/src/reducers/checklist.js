import * as consts from "../constants"

export default function reducer(
    state={
        loading: false,
        id: -1,
        person: '',
        date: '',
        team: ''
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
                team: team
            }
        }
        default:
            return state
    }
}
