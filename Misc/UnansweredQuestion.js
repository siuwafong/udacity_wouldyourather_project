import React, {Component} from 'react'
import { connect } from 'react-redux'
import { handleAnswerQuestion } from '../src/actions/questions'
// import { usersReducer } from '../reducers/users'

class UnansweredQuestion extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleOptionChange = this.handleOptionChange.bind(this)
        this.state = {
            selectedOption: ''
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
        const { questions, id, users } = this.props
        
        return (
            <div>
                <p> {questions[id].author} asks: </p>
                <img alt={questions[id].author} src={users[questions[id].author].avatarURL} />
                <h3> Would you rather...</h3>
                
                <form onSubmit={this.handleSubmit}>
                        <input 
                            type="radio" 
                            checked={this.state.selectedOption === `${questions[id].id}-optionOne`} 
                            value={`${questions[id].id}-optionOne`}  
                            onChange={this.handleOptionChange}/>
                        <label htmlFor={`${questions[id].id}-optionOne`}> 
                            {(questions[id].optionOne.text)} 
                        </label>

                        <input 
                            type="radio" 
                            checked={this.state.selectedOption === `${questions[id].id}-optionTwo`} 
                            value={`${questions[id].id}-optionTwo`} 
                            onChange={this.handleOptionChange}/>
                        <label htmlFor={`${questions[id].id}-optionTwo`}> 
                            {(questions[id].optionTwo.text)} 
                        </label>

                        <button type="submit">Submit</button>
                </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(UnansweredQuestion)