import React, { Component } from 'react'
import { connect } from 'react-redux'
import './UserInfo.css'
import { Container } from '@material-ui/core';

class UserInfo extends Component {
    render() {

        return (
            <Container maxWidth="md" className="UserInfo-container">
                <div>
                    {this.props.rank === 1 && <p className="UserInfo-FirstPlace"> 1st Place! </p>}
                    <h3>{this.props.users[this.props.id].id}</h3>
                    <img className="userInfo-profilePic" alt={this.props.users[this.props.id].id} src={this.props.users[this.props.id].avatarURL} />
                    <p>Questions Answered: {this.props.answerAmount}</p>
                    <p>Questions Asked: {this.props.questionAmount}</p>
                    <p>Total Score: {Number(this.props.questionAmount) + Number(this.props.answerAmount)}</p>
                </div>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps)(UserInfo)