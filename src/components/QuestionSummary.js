import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import './QuestionSummary.css'
import Container from '@material-ui/core/Container';

class QuestionSummary extends Component {

    render() {

        const { questions, id, users } = this.props
        const date = new Date(questions[id].timestamp)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hours = date.getHours()
        const minutes = date.getMinutes()

        return (
            <div>
                <Container className="QuestionSummary-container" maxWidth="md">
                    <p> Date Created: {month}/{day}/{year} at {hours % 12}:{minutes < 10 ? `0${minutes}` : minutes } {date.getHours() > 11 ? "PM" : "AM"} </p>
                    <p> {questions[id].author} asks: </p>
                    <img className="QuestionSummary-profilePic" alt={questions[id].author} src={users[questions[id].author].avatarURL} />
                    <h3>Would you rather...</h3>
                    <Link to={`/questions/${questions[id].id}`}>
                        <button className="QuestionSummary-submitBtn">View Poll</button>
                    </Link>
                </Container>
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

export default connect(mapStateToProps)(QuestionSummary)
