import React, { Component } from 'react'
import { connect } from 'react-redux'

class UserInfo extends Component {
    render() {

        return (
            <div>
                <p>{this.props.users[this.props.id].id}</p>
                <p>Questions Answered: {this.props.answerAmount}</p>
                <p>Questions Asked: {this.props.questionAmount}</p>
                <p>Total Score: {Number(this.props.questionAmount) + Number(this.props.answerAmount)}</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps)(UserInfo)