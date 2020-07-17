import React, { Component } from 'react'
import { connect } from 'react-redux'

class AnsweredQuestion extends Component {
    
    render() {

        const {questions, id} = this.props

        return (
            <div>
              <h1>Asked by: {questions[id].author}</h1>
              <p> {(questions[id].optionOne.text)} </p>
              <p> {(questions[id].optionTwo.text)} </p>
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