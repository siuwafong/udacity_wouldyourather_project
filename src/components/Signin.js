import React, { Component } from 'react'
import { connect } from 'react-redux';
// import * as API from '../utils/api'
import { getAllUsers } from '../actions/users'
import { getAllQuestions } from  '../actions/questions'
import { setAuthedUser } from '../actions/authedUser'
import LoadingBar from 'react-redux-loading'
import { Container } from '@material-ui/core';
import './Signin.css'
import titleImage from '../title.jpg'

class Signin extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            selectedUser: "none",
            errorMessage: false
        }
    }

    componentDidMount(){
        this.props.dispatch(getAllUsers())
        this.props.dispatch(getAllQuestions())
    }

    handleChange(event) {
        this.setState({selectedUser: event.target.value});
    }

    handleSubmit(evt) {
        evt.preventDefault()
        this.state.selectedUser === "none"
        ? this.setState(() => ({errorMessage: true}))
        : this.props.dispatch(setAuthedUser(this.state.selectedUser))
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
                <Container className="Signin-container" maxWidth="lg">
                    {Object.keys(this.props.users).length === 0
                    ? <h2> Fetching users and questions...please wait... </h2>
                    :   <div className="Signin-content">
                            <h1> Would You Rather...? </h1>
                            <img src={titleImage} alt="title" />
                            <h2> Please log in</h2>
                            <form onSubmit={this.handleSubmit}>
                            <label htmlFor="user-select">Sign in:</label>
                            <select name="user-select" id="user-select" onChange={this.handleChange} value={this.state.selectedUser}> 
                                <option value="none" disabled>Select user...</option>
                                {userList.map(user => (
                                    <option value={user.id} key={user.id} >{user.name} </option>
                                ))}
                            </select>
                            <button>Sign In</button>
                            </form>
                            {this.state.errorMessage && <p className="Signin-errorMessage"> Please choose a user.</p>}
                        </div>}
                    
                </Container>
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