import { GET_QUESTIONS_SUCCESS, GET_QUESTIONS_FAILURE, SAVE_ANSWER_SUCCESS, SAVE_ANSWER_FAILURE, CREATE_QUESTION_SUCCESS, CREATE_QUESTION_FAILURE } from '../actions/questions'

export function questionsReducer (state = {}, action) {
    switch(action.type) {
        case GET_QUESTIONS_SUCCESS:
            return { ...action.payload.questions }
        case GET_QUESTIONS_FAILURE:
            return { action }
        case SAVE_ANSWER_SUCCESS:
            
            let questionId = action.payload.info.qid
            let respondent = action.payload.info.authedUser
            let answer = action.payload.info.answer
            
            return answer === "optionOne"
            ? 
                 { 
                    ...state,
                    [questionId] : {
                        ...state[questionId],
                        optionOne: {
                            ...state[questionId.optionOne],
                            votes: state[questionId].optionOne.votes.concat(respondent),
                            text: state[questionId].optionOne.text
                        }
                    }    
                }
            :
             { 
                ...state,
                [questionId] : {
                    ...state[questionId],
                    optionTwo: {
                        ...state[questionId.optionTwo],
                        votes: state[questionId].optionTwo.votes.concat(respondent),
                        text: state[questionId].optionTwo.text
                    }
                }  
            }
        case SAVE_ANSWER_FAILURE:
            return { action }
        case CREATE_QUESTION_SUCCESS:
            const newQuestion = action.payload.info
            const newQuestionId = action.payload.info.id
            return {
                ...state,
                [newQuestionId]: {...newQuestion}
            }
        case CREATE_QUESTION_FAILURE: 
            return { action }
        default:
            return state
    }
}