import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { store } from '../../src/index.js'
import { handleAnswerQuestion } from '../actions/questions'
import { Redirect, Link } from 'react-router-dom'
import Container from '@material-ui/core/Container';
import './QuestionDetails.css'
import { Pie } from 'react-chartjs-2'

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

        const resultsData = {
            labels: [questions[questionId].optionOne.text, questions[questionId].optionTwo.text],
            datasets: [{
                    data: [optionOneVotes, optionTwoVotes],
                    backgroundColor: ["red", "blue"],
                    hoverBackgroundColor: ["red", "blue"]
            }]
        };   

        return (
            <div>
                    {Object.keys(users[authedUser].answers).includes(questionId)
                        ?
                        // Show answered question box
                        <Container maxWidth="md">
                            <div className="QuestionDetails-answered">
                            <Link to="/"><button className="QuestionDetails-backBtn">Back</button></Link> 
                                <h3 className="QuestionDetails-author">Asked by: {questions[questionId].author}</h3>
                                <h2>Would you rather...</h2>
                                <p> {(questions[questionId].optionOne.text)} </p>
                                <p> {optionOnePercentage}% : {optionOneVotes} out of {totalVotes} votes </p> 
                                {questions[questionId].optionOne.votes.includes(authedUser) && <span className="QuestionDetails-yourVoteMsgOne"> You voted for this! </span>}
                                <hr className="QuestionDetails-hr"/>
                                <p> {(questions[questionId].optionTwo.text)} </p>
                                <p> {optionTwoPercentage}% : {optionTwoVotes} out of {totalVotes} votes </p>
                                {questions[questionId].optionTwo.votes.includes(authedUser) && <span className="QuestionDetails-yourVoteMsgTwo"> You voted for this! </span>}
                                <Pie data={resultsData} />
                            </div>
                        </Container>
                        : 
                        // Show unanswered question box
                        <Container maxWidth="md">
                            <div className="QuestionDetails-unanswered">
                                <Link to="/"><button className="QuestionDetails-backBtn">Back</button></Link> 
                                <p> {questions[questionId].author} asks: </p>
                                <img alt={questions[questionId].author} src={users[questions[questionId].author].avatarURL} className="QuestionDetails-profilePic"/>
                                <h3> Would you rather...</h3>
                                
                                <form onSubmit={this.handleSubmit} className="QuestionDetails-form">
                                    <div className="QuestionDetails-option">
                                        <input 
                                            type="radio" 
                                            checked={this.state.selectedOption === `${questions[questionId].id}-optionOne`} 
                                            value={`${questions[questionId].id}-optionOne`}  
                                            onChange={this.handleOptionChange}/>
                                        <label htmlFor={`${questions[questionId].id}-optionOne`}> 
                                            {(questions[questionId].optionOne.text)} 
                                        </label>
                                    </div>

                                    <div className="QuestionDetails-option">
                                        <input 
                                            type="radio" 
                                            checked={this.state.selectedOption === `${questions[questionId].id}-optionTwo`} 
                                            value={`${questions[questionId].id}-optionTwo`} 
                                            onChange={this.handleOptionChange}/>
                                        <label htmlFor={`${questions[questionId].id}-optionTwo`}> 
                                            {(questions[questionId].optionTwo.text)} 
                                        </label>
                                    </div>
            
                                    <button className="QuestionDetails-submitBtn" type="submit">Submit</button>
                                </form>
                            </div>
                        </Container>
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