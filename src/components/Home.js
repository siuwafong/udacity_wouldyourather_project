import React, { Component } from 'react'
import QuestionList from './QuestionList'
import Signin from './Signin'
import { connect } from 'react-redux'


class Home extends Component {
    render() {
        return (
            <div>
                {this.props.authedUser === null 
                ? <Signin />
                : 
                <>
                <QuestionList authedUser={this.props.authedUser}/>
                </>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authedUser: state.authedUser, 
    }
  }

export default connect(mapStateToProps)(Home)