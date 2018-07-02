import * as consts from "../constants"

export default function reducer(
    state={
        id: -1,
        date: '',
        team: '',
        person: '',
        loading: false,
        sections: [],
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
        case consts.FETCH_SECTIONS: {
            return {
                ...state,
                sectionsReady: false,
                loading: true
            }
        }
        case consts.FETCH_SECTIONS_FULFILLED: {
            const { sections } = action.payload;
            return {
                ...state,
                sections: sections,
                sectionsReady: true
            }
        }
        case consts.FETCH_QUESTIONS: {
            return {
                ...state,
                questionsReady: false,
                loading: true
            }
        }
        case consts.FETCH_CHECKLIST_ITEM_FULFILLED: {
            let { sectionId, questionId, id, checked } = action.payload;

            let sections = state.sections;
            let section = state.sections[sectionId];
            let questions = state.sections[sectionId].questions;
            let question = state.sections[sectionId].questions[questionId];

            question = {
                ...question,
                checked: checked,
                checklistItemId: id,
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
        case consts.TOGGLE_QUESTION: {
            let question = action.payload.question;
            let checked = !state.questions[question].checked
            return {
                ...state,
                questions:{
                    ...state.questions,
                    [question]:{
                        ...state.questions[question],
                        checked: checked,
                        color: checked ? "complete" : "incomplete"
                    }
                }
            }
        }
        default:
            return state
    }
}


