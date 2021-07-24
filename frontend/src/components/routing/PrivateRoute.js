import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading }, ...rest }) => (       //for more info on rest, see article 9.1 @ 3:00
  <Route {...rest} render={props => !isAuthenticated && !loading ? (<Redirect to='/login' />) : (<Component {...props} />)} />
)                                                                                                           //pass props to that component

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth                          //pull in the State from auth reducer using connect
})

export default connect(mapStateToProps)(PrivateRoute)
