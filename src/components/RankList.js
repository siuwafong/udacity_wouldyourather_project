import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserInfo from './UserInfo'

class RankList extends Component {
    render() {

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

        console.log(userStats)

        return (
            <div>
                <h1> Top Users </h1>
                {userStats.sort((a, b) => (b.answerAmount + b.questionAmount) - (a.answerAmount + a.questionAmount))
                    .map(user => (
                        <UserInfo key={user.id} id={user.id} answerAmount={user.answerAmount} questionAmount={user.questionAmount}/>
                    ))
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        questions: state.questions,
        users: state.users
    }
}

export default connect(mapStateToProps)(RankList)