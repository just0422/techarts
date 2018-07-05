import axios from "axios";

import * as consts from "../constants";

export function loadData(person_name, team){
    return (dispatch) => {
        dispatch({ type: consts.FETCH_CHECKLIST });
        dispatch({ type: consts.FETCH_SECTIONS })
        dispatch({ type: consts.FETCH_QUESTIONS })
        
        // Query all initial data for app
        axios.all([
            axios.get(consts.CHECKLIST + person_name + "/" + team),
            axios.get(consts.SECTIONS + team),
            axios.get(consts.QUESTIONS + team)
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
            let sections = {};
            for (var i = 0; i < sections_response.data.length; i++){
                let section = sections_response.data[i];
                let sectionId = section.id;
                sections[sectionId] = section
                sections[sectionId].questions = {}

                for(let j = 0; j < questions_response.data.length; j++){
                    let question = questions_response.data[j];
                    if (question.section === sections[sectionId].id){
                        sections[sectionId].questions[question.id] = question
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
                let url = consts.CHECKLIST_ITEM + checklistId + "/" + questions[i].id;
                checklistItemPromises.push(axios.get(url)) 
            }

            axios.all(checklistItemPromises).then( (responses) => {
                for(let i = 0; i < responses.length; i++){
                    let response = responses[i];
                    
                    let section = -1;
                    for (let sectionId in sections) 
                        if (response.data.question in sections[sectionId].questions)
                            section = sectionId;

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

export function toggleQuestion(checklist, section, question, checked){
    return (dispatch) => {
        let url = consts.CHECKLIST_ITEM + checklist + "/" + question + "/";
        axios.put(url, { checked: checked })
        dispatch({
            type: consts.TOGGLE_QUESTION,
            payload: {
                sectionId: section,
                questionId: question,
                checked: checked
            }
        })
    }
}
