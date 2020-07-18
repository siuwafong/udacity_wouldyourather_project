import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { store } from '../../src/index.js'
import { handleAnswerQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'
import './QuestionDetails.css'

class QuestionDetails extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleOptionChange = this.handleOptionChange.bind(this)
        this.state = {
            selectedOption: '',
            error: false
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const answerIdAndOption = this.state.selectedOption.split('-')
        const answer = {
            authedUser: this.props.authedUser,
            qid: answerIdAndOption[0],
            answer: answerIdAndOption[1]
        }
        this.props.addQuestionAnswer(answer)
            
        this.setState(() => ({selectedOption: ''}))
    }

    handleOptionChange = (e) => {
        const choice = e.target.value
        this.setState(() => ({selectedOption: choice}))
    }

    render() {
        const questionId = this.props.match.params.question_id
        const { questions, authedUser, users } = this.props

  
        if (!Object.keys(this.props.questions).includes(this.props.match.params.question_id)) 
            { return <Redirect to={{
                                    pathname: "/ErrorPage",
                                    state: { errorType: "questionId"}
            }}
            />}

        if (authedUser === null) 
        {
            return <Redirect to={{
                                pathname: "/ErrorPage", 
                                state: { errorType: "notLoggedIn"}
            }}/>
        }

        const optionOneVotes = questions[questionId].optionOne.votes.length
        const optionTwoVotes = questions[questionId].optionTwo.votes.length
        const totalVotes = optionOneVotes + optionTwoVotes
        const optionOnePercentage = (optionOneVotes/totalVotes * 100).toFixed(1)
        const optionTwoPercentage = (optionTwoVotes/totalVotes * 100).toFixed(1)
 

        return (
            <div>
                    {Object.keys(users[authedUser].answers).includes(questionId)
                        ?
                        // Show answered question box
                        <div className="QuestionDetails-answered">
                            <h1>Asked by: {questions[questionId].author}</h1>
                            <p> {(questions[questionId].optionOne.text)} </p>
                            <p> {optionOnePercentage}% : {optionOneVotes} out of {totalVotes} votes</p> 
                            <p> {(questions[questionId].optionTwo.text)} </p>
                            <p> {optionTwoPercentage}% : {optionTwoVotes} out of {totalVotes} votes</p>
                        </div>
                        : 
                        // Show unanswered question box
                        <div className="QuestionDetails-unanswered">
                        <p> {questions[questionId].author} asks: </p>
                        <img alt={questions[questionId].author} src={users[questions[questionId].author].avatarURL} />
                        <h3> Would you rather...</h3>
                        
                        <form onSubmit={this.handleSubmit}>
                                <input 
                                    type="radio" 
                                    checked={this.state.selectedOption === `${questions[questionId].id}-optionOne`} 
                                    value={`${questions[questionId].id}-optionOne`}  
                                    onChange={this.handleOptionChange}/>
                                <label htmlFor={`${questions[questionId].id}-optionOne`}> 
                                    {(questions[questionId].optionOne.text)} 
                                </label>
        
                                <input 
                                    type="radio" 
                                    checked={this.state.selectedOption === `${questions[questionId].id}-optionTwo`} 
                                    value={`${questions[questionId].id}-optionTwo`} 
                                    onChange={this.handleOptionChange}/>
                                <label htmlFor={`${questions[questionId].id}-optionTwo`}> 
                                    {(questions[questionId].optionTwo.text)} 
                                </label>
        
                                <button type="submit">Submit</button>
                        </form>
                    </div>
                    }   
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        questions: state.questions,
        authedUser: state.authedUser,
        users: state.users
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addQuestionAnswer: answer => dispatch(handleAnswerQuestion(answer))
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetails)