import React, {Component} from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Navbar from './Navbar'
import CreateQuestion from './CreateQuestion'
import RankList from './RankList'
import Home from './Home'
import QuestionDetails from './QuestionDetails'
import ErrorPage from './ErrorPage'

class App extends Component {
  render() {
    
    return (
      <>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/add" render={() => <CreateQuestion />} />
            <Route exact path="/leaderboard" render={() => <RankList />} />
            <Route exact path="/questions/:question_id" render={routeProps => <QuestionDetails {...routeProps} />} />
            <Route exact path="/errorpage" render={(routeProps) => <ErrorPage {...routeProps}/>} />
            <Redirect to={{
                        pathname: "/ErrorPage",
                        state: { errorType: "invalidURL"}
            }}
            />
          </Switch>
        </div>
      </>
    );
  }
}

// Object.keys(questions).includes(questions[id].id) ? `/questions/${questions[id].id}` : `/error`

const mapStateToProps = (state) => {
  return {
      authedUser: state.authedUser, 
      questions: state.questions
  }
}

export default connect(mapStateToProps)(App);

