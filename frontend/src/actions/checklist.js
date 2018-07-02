import axios from "axios";

import * as consts from "../constants"

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
            const checklistId = id;
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
            let sections = [];
            for (var i = 0; i < sections_response.data.length; i++){
                sections.push(sections_response.data[i]);
                sections[i].questions = {}

                for(let j = 0; j < questions_response.data.length; j++){
                    let question = questions_response.data[j];
                    if (question.section === sections[i].id){
                        sections[i].questions[question.id] = question
                    }
                }

            }
            dispatch({
                type: consts.FETCH_SECTIONS_FULFILLED,
                payload: {
                    sections: sections
                }
            })

            let checklistItemPromises = [];
            let questions = questions_response.data;
            for (let i = 0; i < questions.length; i++){
                let url = "/api/checklist_item/" + checklistId + "/" + questions[i].id;
                checklistItemPromises.push(axios.get(url)) 
            }

            axios.all(checklistItemPromises).then( (responses) => {
                for(let i = 0; i < responses.length; i++){
                    let response = responses[i];
                    
                    let section = -1;
                    for (let j = 0; j < sections.length; j++)
                        if (response.data.question in sections[j].questions)
                            section = j;

                    dispatch({
                        type: consts.FETCH_CHECKLIST_ITEM_FULFILLED,
                        payload: {
                            id: response.data.id,
                            checked: response.data.checked,
                            questionId: response.data.question,
                            sectionId: section
                        }
                    });
                }
            })
        }))
    }
}

export function toggleQuestion(question){
    return (dispatch) => {
        dispatch({
            type: consts.TOGGLE_QUESTION,
            payload: {
                question: question
            }
        })
    }
}
