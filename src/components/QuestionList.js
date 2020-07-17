import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllQuestions } from  '../actions/questions'
import UnansweredQuestion  from './UnansweredQuestion'
import AnsweredQuestion from './AnsweredQuestion'

class QuestionList extends Component {
    
    componentDidMount(){
        this.props.dispatch(getAllQuestions())
    }

    render() {
        console.log(this.props.questions)
        const questionList = Object.keys(this.props.questions).map(key => {
            return this.props.questions[key]
        })

        return (
            <div>
                <h1> Unanswered Questions </h1>
                {questionList.filter(question => (!question.optionOne.votes.includes(this.props.authedUser) && !question.optionTwo.votes.includes(this.props.authedUser)))
                    .map((filteredQuestion) => (
                       <UnansweredQuestion key={filteredQuestion.id} id={filteredQuestion.id} />
                    ))
                } 

                <h1> Answered Questions </h1>
                {questionList.filter(question => (question.optionOne.votes.includes(this.props.authedUser) || question.optionTwo.votes.includes(this.props.authedUser)))
                    .map((filteredQuestion, idx) => (
                        <AnsweredQuestion key={filteredQuestion.id} id={filteredQuestion.id} />
                    ))
                } 
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        questions: state.questions,
        authedUser: state.authedUser,
    }
}

export default connect(mapStateToProps)(QuestionList)