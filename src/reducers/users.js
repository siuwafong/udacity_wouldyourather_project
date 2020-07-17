import { GET_USERS_SUCCESS, GET_USERS_FAILURE } from '../actions/users'
import { SAVE_ANSWER_SUCCESS, CREATE_QUESTION_SUCCESS} from '../actions/questions'

export function usersReducer (state = {}, action) {
    switch(action.type) {
        case GET_USERS_SUCCESS:
            return {...state, ...action.payload.users}
        case GET_USERS_FAILURE:
            return { action }
        case SAVE_ANSWER_SUCCESS:
            let questionId = action.payload.info.qid
            let respondent = action.payload.info.authedUser
            let answer = action.payload.info.answer
            return { 
                ...state, 
                [respondent]: {
                    ...state[respondent],
                    answers: {
                        ...state[respondent].answers,
                        [questionId]: answer 
                    }   
                }
            }
        case CREATE_QUESTION_SUCCESS:
            const creator = action.payload.info.author
            const newQuestionId = action.payload.info.id
            return {
                ...state,
                [creator]: {
                    ...state[creator],
                    questions: state[creator].questions.concat(newQuestionId)
                }
            }
        default:
            return state
    }
}
