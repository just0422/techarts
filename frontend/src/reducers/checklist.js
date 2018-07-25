import * as consts from "../constants"

export default function reducer(
    state={
        id: -1,
        date: '',
        team: '',
        person: '',
        campus: 'CTG',
        loading: false,
        sections: {},
        subquestion: {},
        subquestionList: [],
        checklistReady: false,
        sectionsReady: false,
        questionsReady: false,
        subquestionReady: false
    }, action){
    switch(action.type){
        case consts.SELECT_CAMPUS: {
            const currentCampus = action.payload;
            return {
                ...state,
                campus: currentCampus
            }
        }
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
        case consts.FETCH_SUBQUESTION:{
            return {
                ...state,
                subquestionReady: false
            }
        }
        case consts.FETCH_SUBQUESTION_FULFILLED:{
            return {
                ...state,
                subquestion: action.payload.subquestion,
                subquestionReady: true
            }
        }
        default:
            return state
    }
}


