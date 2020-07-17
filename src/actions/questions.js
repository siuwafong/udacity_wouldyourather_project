import { getQuestions, saveQuestion } from '../utils/api'
import { saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const GET_QUESTIONS_SUCCESS = "GET_QUESTIONS_SUCCESS"
export const GET_QUESTIONS_FAILURE = "GET_QUESTIONS_FAILURE"
export const SAVE_ANSWER_SUCCESS = "SAVE_ANSWER_SUCCESS"
export const SAVE_ANSWER_FAILURE = "SAVE_ANSWER_FAILURE"
export const CREATE_QUESTION_SUCCESS = "CREATE_QUESTION_SUCCESS"
export const CREATE_QUESTION_FAILURE = "CREATE_QUESTION_FAILURE"

export const getAllQuestions = () => {
    return (dispatch) => {
        return getQuestions()
            .then(res => {
                dispatch(getQuestionsSuccess(res))
            })
            .catch(err => {
                dispatch(getQuestionsFailure(err.message))
            })
    }
}

export const handleAnswerQuestion = (info) => {
    return (dispatch) => {
        
        dispatch(showLoading())
        
        dispatch(saveAnswerSuccess(info))
        return saveQuestionAnswer(info)
        .then(() => dispatch(hideLoading()))
        .catch(err => {
            dispatch(saveAnswerFailure(err.message))
        })
    }
}

export const handleCreateQuestion = (info) => {
    return (dispatch) => {

        dispatch(showLoading())

        return saveQuestion(info)
            .then(res => dispatch(createQuestionSuccess(res)))
            .then(() => dispatch(hideLoading()))
            .catch(err => {
                dispatch(createQuestionFailure(err.message))
        })
    }
}

const createQuestionSuccess = (info) => ({
    type: CREATE_QUESTION_SUCCESS,
    payload: { info }
})

const createQuestionFailure = (err) => ({
    type: CREATE_QUESTION_FAILURE,
    payload: { err }
})


const getQuestionsSuccess = (questions) => ({
    type: GET_QUESTIONS_SUCCESS,
    payload: { questions }
})

const getQuestionsFailure = (err) => ({
    type: GET_QUESTIONS_FAILURE,
    payload: { err }
})

const saveAnswerSuccess = (info) => ({
    type: SAVE_ANSWER_SUCCESS,
    payload: { info }
})

const saveAnswerFailure = (err) => ({
    type: SAVE_ANSWER_FAILURE,
    payload: { err }
})

