import { combineReducers } from 'redux'
import { usersReducer } from './users'
import { questionsReducer } from './questions'
import { loadingBarReducer } from 'react-redux-loading'
import authedUserReducer from './authedUser'

// after combining the reducers they can be used as props or dispatch methods in components
const rootReducer = combineReducers({
    authedUser: authedUserReducer,
    users: usersReducer,
    questions: questionsReducer,
    loadingBar: loadingBarReducer
})

export default rootReducer