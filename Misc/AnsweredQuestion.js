import React, { Component } from 'react'
import { connect } from 'react-redux'

class AnsweredQuestion extends Component {
    
    render() {
        const {questions, id} = this.props
        const optionOneVotes = questions[id].optionOne.votes.length
        const optionTwoVotes = questions[id].optionTwo.votes.length
        const totalVotes = optionOneVotes + optionTwoVotes
        const optionOnePercentage = (optionOneVotes/totalVotes * 100).toFixed(1)
        const optionTwoPercentage = (optionTwoVotes/totalVotes * 100).toFixed(1)  

        return (
            <div>
              <h1>Asked by: {questions[id].author}</h1>
              <p> {(questions[id].optionOne.text)} </p>
              <p> {optionOnePercentage}% : {optionOneVotes} out of {totalVotes} votes</p> 
              <p> {(questions[id].optionTwo.text)} </p>
              <p> {optionTwoPercentage}% : {optionTwoVotes} out of {totalVotes} votes</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        questions: state.questions,
    }
}

export default connect(mapStateToProps)(AnsweredQuestion)