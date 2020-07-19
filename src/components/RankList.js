import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserInfo from './UserInfo'
import { Redirect } from 'react-router-dom'
import { Container } from '@material-ui/core';
import './RankList.css'

class RankList extends Component {
    render() {

        if (this.props.authedUser === null) 
        {
            return <Redirect to={{
                                pathname: "/ErrorPage", 
                                state: { errorType: "notLoggedIn", isLoggedIn: false }
            }}/>
        }

        const userList = Object.keys(this.props.users).map(key => {
            return this.props.users[key]
        })

        const userStats = userList.map(user => (
            {
                id: user.id,
                answerAmount: Object.keys(user.answers).map(key => {
                    return key
                }).length,
                questionAmount: user.questions.length,
            }
        ))

        return (
            <Container maxWidth="lg" className="RankList-container">
                <div>
                    <h1> Top Users </h1>
                    {userStats
                        .sort((a, b) => (b.answerAmount + b.questionAmount) - (a.answerAmount + a.questionAmount))
                        .map((user, idx) => (
                            <UserInfo key={user.id} id={user.id} answerAmount={user.answerAmount} questionAmount={user.questionAmount} rank={idx + 1}/>
                        ))
                    }
                </div>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        questions: state.questions,
        users: state.users,
        authedUser: state.authedUser
    }
}

export default connect(mapStateToProps)(RankList)