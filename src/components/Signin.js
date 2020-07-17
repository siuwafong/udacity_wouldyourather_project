import React, { Component } from 'react'
import { connect } from 'react-redux';
// import * as API from '../utils/api'
import { getAllUsers } from '../actions/users'
import { setAuthedUser } from '../actions/authedUser'
import LoadingBar from 'react-redux-loading'

class Signin extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount(){
        this.props.dispatch(getAllUsers())
    }

    handleChange(evt) {
        this.props.dispatch(setAuthedUser(evt.target.value))
    }

    render() {

        // converted the users object to an array so that it can be mapped
        // into the login dropdown menu
        const userList = Object.keys(this.props.users).map(key => {
            return this.props.users[key]
        })
       
        return (
            <div>
                <LoadingBar />
                <h1> Would You Rather...? </h1>
                {Object.keys(this.props.users).length === 0
                ? <h2> Fetching users...please wait... </h2>
                :   <div>
                        <h2> Please log in</h2>
                        <label htmlFor="user-select">Log in:</label>
                        <select name="user-select" id="user-select" value="none" onChange={this.handleChange}> 
                            <option value="none" disabled>Select user...</option>
                            {userList.map(user => (
                                <option value={user.id} key={user.id}>{user.name} </option>
                            ))}
                        </select>
                    </div>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
        authedUser: state.authedUser,
    }
}

export default connect(mapStateToProps)(Signin)