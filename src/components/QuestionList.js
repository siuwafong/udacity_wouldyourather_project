import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionSummary from './QuestionSummary'
import { Tabs, Tab, AppBar } from '@material-ui/core'

class QuestionList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedTab: "unansweredQuestions"
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(evt, newValue) {
        this.setState(() => ({selectedTab: newValue}))
    }

    render() {
        
        // convert questions to an array 
        const questionList = Object.keys(this.props.questions).map(key => {
            return this.props.questions[key]
        })

        return (            
            <div>
                <AppBar position="static">
                    <Tabs value={this.state.selectedTab} onChange={this.handleChange} centered>
                        <Tab value="unansweredQuestions" label="Unanswered Questions" />
                        <Tab value="answeredQuestions" label="Answered Questions" />
                    </Tabs>
                </AppBar>
                
               
                {this.state.selectedTab === "unansweredQuestions" &&       
                 questionList.filter(question => (!question.optionOne.votes.includes(this.props.authedUser) && !question.optionTwo.votes
                        .includes(this.props.authedUser)))
                        .sort((a, b) => b.timestamp - a.timestamp)
                        .map((filteredQuestion) => (
                            <QuestionSummary key={filteredQuestion.id} id={filteredQuestion.id}/>
                        ))
                }

                {this.state.selectedTab === "answeredQuestions" &&
                questionList.filter(question => (question.optionOne.votes.includes(this.props.authedUser) || question.optionTwo.votes
                    .includes(this.props.authedUser)))
                    .sort((a, b) => b.timestamp - a.timestamp)
                    .map((filteredQuestion) => (
                        <QuestionSummary key={filteredQuestion.id} id={filteredQuestion.id}/>
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