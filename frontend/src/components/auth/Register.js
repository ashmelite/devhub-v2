import React, { Fragment, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';  //1. connect this component to redux
import { setAlert } from '../../actions/alert';   //2. bring in the action and to use it, pass it as a parameter to connect
import { register, resetLoading } from '../../actions/auth';
import PropTypes from 'prop-types';


// Also, instead of bringing in all (props), we can just pull out required function from it as ({ setAlert }) and use SetAlert() directly (below) instead of props.setAlert()
const Register = ({ setAlert, register, resetLoading, isAuthenticated }) => {
  
  useEffect(() => {
    resetLoading();
  }, [resetLoading]);
  
  //formData is our 'state' which is basically an object with default values as set below; setFormData is a function to update our 'state'
  const [formData, setFormData] = useState({
    name: '',         //this here is initial state
    email: '',
    password: '',
    password2: ''
  });
  
  const { name, email, password, password2 } = formData;    //these variables name, email, etc. are different from the state variables (name, email, etc.) as declared above in useState
  
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const onSubmit = async e => {
    e.preventDefault();
    
    if (password !== password2) {
      // console.log('Passwords do not match!');
      setAlert('Passwords do not match!', 'danger');         //5. now that we've brought in our action (which is basically a function) using props, we're calling setAlert function from here and passing in: msg and alertType
    } else {
      // console.log('Success!');
      register({ name, email, password });
    }
  };
  
  //Redirect if logged in
  if(isAuthenticated) {
    return <Redirect to='/dashboard' />
  }
  
  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user" /> Create Your Account
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)} /*required*/ />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} /*required*/ />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
            // minLength="6"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={e => onChange(e)}
            // minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </Fragment>
  )
};


Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  resetLoading: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});


//3. to use the action setAlert, pass it in connect(); connect takes in two things: 1.State 2.Action
export default connect(mapStateToProps, { setAlert, register, resetLoading })(Register);     //4. now as this action setAlert is passed into connect(), it's available to use as props.setAlert which we can bring into Register declaration above.
