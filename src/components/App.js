import React, {Fragment, Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import { connect } from 'react-redux'
import Navbar from './Navbar'
import QuestionList from './QuestionList'
import CreateQuestion from './CreateQuestion'
import Signin from './Signin'
import RankList from './RankList'
import { setAuthedUser } from '../actions/authedUser'

class App extends Component {
  render() {
    
    return (
      <>
        <div className="App">
          {this.props.authedUser === null 
            ? <Signin />
            : 
            <>
              <h3> Welcome {this.props.authedUser}!</h3>

              <button onClick={this.props.signOut}> Sign Out</button>
              
              <QuestionList authedUser={this.props.authedUser}/>
              <CreateQuestion />
              <RankList />
            </>}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      authedUser: state.authedUser, 
  }
}

function mapDispatchToProps(dispatch) {
  return {
      signOut: () => dispatch(setAuthedUser(null))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

