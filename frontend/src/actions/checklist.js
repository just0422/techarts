import axios from "axios";

import * as consts from "../constants"

// Either create a new checklist item or 
function initQuestion(questionId, checklistId){
    var url = "/api/checklist_item/" + checklistId + "/" + questionId;
    axios.get(url)
        .then((response) => {
            return {
                checklistItemId: response.data.id,
                checked: response.data.checked
            }
        })
}

export function loadData(person_name, team){
    return (dispatch) => {
        dispatch({ type: consts.FETCH_CHECKLIST });
        dispatch({ type: consts.FETCH_SECTIONS })
        dispatch({ type: consts.FETCH_QUESTIONS })
        
        // Query all initial data for app
        axios.all([
            axios.get("/api/checklist/" + person_name + "/" + team),
            axios.get("/api/sections/" + team),
            axios.get("/api/questions/" + team)
        ])
        .then(axios.spread( (checklist_response, sections_response, questions_response) => {
            // Manage checklist response
            const { id, person, date, team } = checklist_response.data
            dispatch({
                type: consts.FETCH_CHECKLIST_FULFILLED, 
                payload: {
                    id: id,
                    person: person,
                    date: date,
                    team: team
                }
            })
            
            // Manage sections response
            dispatch({
                type: consts.FETCH_SECTIONS_FULFILLED,
                payload: {
                    sections: sections_response.data
                }
            })

            // Manage question response
            let questions = questions_response.data;
            for (let i = 0; i < questions.length; i++){
                let { checklistItemId, checked } = initQuestion(questions[i].id, id);

                questions[i].checklistItemId = checklistItemId;
                questions[i].checked = checked;
            }
            dispatch({
                type: consts.FETCH_QUESTIONS_FULFILLED,
                payload: {
                    questions: questions
                }
            })
        }))
    }
}

