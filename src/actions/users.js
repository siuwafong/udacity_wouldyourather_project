import { getUsers } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS"
export const GET_USERS_FAILURE = "GET_USERS_FAILURE"

export const getAllUsers = () => {
    return (dispatch) => {

        dispatch(showLoading())

        return getUsers()
            .then(res => {
                dispatch(getUsersSuccess(res))
            })
            .then(() => dispatch(hideLoading()))
            .catch(err => {
                dispatch(getUsersFailure(err.message))
            })
    }
}

const getUsersSuccess = (users) => ({
    type: GET_USERS_SUCCESS,
    payload: { users }
})

const getUsersFailure = (err) => ({
    type: GET_USERS_FAILURE,
    payload: { err }
})