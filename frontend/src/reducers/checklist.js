import * as consts from "../constants"

export default function reducer(
    state={
        id: -1,
        date: '',
        team: '',
        person: '',
        loading: false,
        sections: {},
        checklistReady: false,
        sectionsReady: false,
        questionsReady: false
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
        case consts.FETCH_CHECKLIST_ITEMS: {
            return {
                ...state,
                sectionsReady: false,
                loading: true
            }
        }
        case consts.FETCH_CHECKLIST_ITEMS_FULFILLED: {
            let { sections } = action.payload;

            return {
                ...state,
                sections: sections,
                sectionsReady: true
            }
        }
        case consts.TOGGLE_QUESTION: {
            let { sectionId, questionId, checked } = action.payload;
            let sections = state.sections;
            let section = state.sections[sectionId];
            let questions = state.sections[sectionId].questions;
            let question = state.sections[sectionId].questions[questionId];


            question = {
                ...question,
                checked: checked,
                color: checked ? "complete" : "incomplete"
            }
            questions[questionId] = question;

            section = {
                ...section,
                questions: questions
            }

            sections[sectionId] = section

            return {
                ...state,
                sections: sections
            }
        }
        default:
            return state
    }
}


