import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import './Navbar.css'

class Navbar extends Component {

    render() {
        return (
            <div className="Navbar">
            <NavLink className={this.props.authedUser === null ? "disabled-link" : "Navbar-link"} exact activeClassName='Navbar-active' to='/'>
            Home
            </NavLink>
            <NavLink className={this.props.authedUser === null ? "disabled-link" : "Navbar-link"} exact activeClassName='Navbar-active' to='/add'>
            New Question
            </NavLink>
            <NavLink className={this.props.authedUser === null ? "disabled-link" : "Navbar-link"} exact activeClassName='Navbar-active' to='/leaderBoard'>
            Leader Board
            </NavLink>
            
            {this.props.authedUser !== null &&
                <div className="Navbar-userinfo">
                    <p> Welcome {this.props.authedUser}! </p>
                    <Link exact to="/">
                        <button className="Navbar-signout" onClick={this.props.signOut}> Sign Out</button>
                    </Link>
                </div>
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
  
  function mapDispatchToProps(dispatch) {
    return {
        signOut: () => dispatch(setAuthedUser(null))
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)