import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleCreateQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'



class CreateQuestion extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            optionOneText: '',
            optionTwoText: '',
            redirect: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit(evt) {
        evt.preventDefault();
        console.log("QUESTION CREATED!")

        // TODO: create error message
        this.props.createQuestion({
            author: this.props.authedUser,
            optionOneText: this.state.optionOneText,
            optionTwoText: this.state.optionTwoText
        })
        this.setState({optionOneText: '', optionTwoText: '', redirect: true})

    }

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    render() {

        if (this.state.redirect) {return <Redirect to="/" />}

        if (this.props.authedUser === null) 
        {
            return <Redirect to={{
                                pathname: "/ErrorPage", 
                                state: { errorType: "notLoggedIn", isLoggedIn: false }
            }}/>
        }
        
        return (
            <div>
                <h1> Would you rather </h1>
                <form className="new-question" onSubmit={this.handleSubmit}>
                    <input 
                        id="optionOneText"
                        name="optionOneText"
                        placeholder="Enter option 1 of your question"
                        value={this.state.optionOneText}
                        onChange={this.handleChange}
                    />
                    <br />
                    OR
                    <br/>
                    <input
                        id="optionTwoText"
                        name="optionTwoText" 
                        placeholder="Enter option 2 of your question"
                        value={this.state.optionTwoText}
                        onChange={this.handleChange}                    
                    />
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authedUser: state.authedUser,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createQuestion: question => dispatch(handleCreateQuestion(question))
    };
  }


export default connect(mapStateToProps, mapDispatchToProps)(CreateQuestion)