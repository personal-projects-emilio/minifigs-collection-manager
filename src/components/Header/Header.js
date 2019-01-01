import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';


import classes from './Header.css';



export  class Header extends Component {
  render() {
    let authNav = <NavLink to="/auth" activeClassName={classes.Active}>Authentification</NavLink>;

    if (this.props.isAuth) {
        authNav = <a onClick={this.props.logout}>Logout</a>
    }
    return (
        <header className={classes.Header}>
		<div>
            <NavLink to="/"><h1 className={classes.Title}>Minifigs Collection Manager</h1></NavLink>
        </div>
        <nav>
            <ul className={classes.Nav}>
                <li className={classes.Link}>
                    <NavLink exact to="/" activeClassName={classes.Active}>Minifigs</NavLink>
                </li>
                <li className={classes.Link}>
                    <NavLink to="/frames" activeClassName={classes.Active}>Frames</NavLink>
                </li>
                <li className={classes.Link}>
                    <NavLink to="/trunks" activeClassName={classes.Active}>Trunks</NavLink>
                </li>
                <li className={classes.Link}>
                    {authNav}
                </li>
            </ul>
        </nav>
	</header>
    )
  }
}
const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch( actions.logout() )
    };
};

export default withRouter(connect( mapStateToProps, mapDispatchToProps )(Header) );