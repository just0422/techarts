const backend_url = "http://techapi.justin-maldonado.com"

// URLS
export const TEAMS = backend_url + "/api/teams/"
export const CHECKLIST = backend_url + "/api/checklist/"
export const SECTIONS = backend_url + "/api/sections/"
export const QUESTIONS = backend_url + "/api/questions/"
export const CHECKLIST_ITEM = backend_url + "/api/checklist_item/"
export const SUBQUESTION = backend_url + "/api/subquestion/"
export const FIXTURE = backend_url + "/api/fixture/"
export const FIXTURES = backend_url + "/api/fixtures/"

// Generic
export const SELECT_TEAM = "SELECT_TEAM"
export const FETCH_CHECKLIST = "FETCH_CHECKLIST"
export const FETCH_CHECKLIST_FULFILLED = FETCH_CHECKLIST + "_FULFILLED"
export const FETCH_TEAMS = "FETCH_TEAMS"
export const FETCH_TEAMS_FULFILLED = FETCH_TEAMS + "_FULFILLED"
//export const FETCH_TEAMS_REJECTED = FETCH_TEAMS + "_REJECTED"

// Index
export const SELECT_CAMPUS = "SELECT_CAMPUS"

// Navbar
export const SET_PERSON_NAME="SET_PERSON_NAME"

// Checklist
export const FETCH_CHECKLIST_ITEMS = "FETCH_CHECKLIST_ITEMS"
export const FETCH_CHECKLIST_ITEMS_FULFILLED = FETCH_CHECKLIST_ITEMS + "_FULFILLED"
export const TOGGLE_QUESTION = "TOGGLE_QUESTION";
export const FETCH_SUBQUESTION = "FETCH_SUBQUESTION";
export const FETCH_SUBQUESTION_FULFILLED = FETCH_SUBQUESTION + "_FULFILLED";
export const RESET_SUBQUESTION = "RESET_SUBQUESTION"
export const FETCH_FIXTURES = "FETCH_FIXTURES";
export const FETCH_FIXTURES_FULFILLED = FETCH_FIXTURES + "_FULFILLED";
export const TOGGLE_FIXTURES_WORKING = "TOGGLE_FIXTURES_WORKING";
export const SAVE_FIXTURE = "SAVE_FIXTURE";
export const SAVE_FIXTURE_FULFILLED = SAVE_FIXTURE + "_FULFILLED";
