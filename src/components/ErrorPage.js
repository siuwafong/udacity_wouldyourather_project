import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux'


class ErrorPage extends Component {
    
    render() {
        console.log(this.props.authedUser)
        let errorType = this.props.location.state.errorType
        let errorMessage = " "

        if (errorType === "questionId") {
             errorMessage = "This question does not exist."
        } else if (errorType === "notLoggedIn") {
             errorMessage = "You need to sign in first to view this page"
        } else if (errorType === "invalidURL") {
             errorMessage = "You entered an invalid URL"
        } else {
             errorMessage = "Error"
        }

        return (
            <div>
                <h3>404</h3>
                    <div>
                        <p>{errorMessage}</p>
                        <Link to="/">
                            <button> Return Home</button>
                        </Link>
                    </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authedUser: state.authedUser,
    }
}

export default connect(mapStateToProps)(ErrorPage)