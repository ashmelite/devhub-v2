import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './App.css';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import PrivateRoute from './components/routing/PrivateRoute';


//Redux;   to use the store, import it here; provider connects them (App and store) together so that any component inside <Provider> can access the Application State which resides in the 'store'
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';


if (localStorage.token) {               //for more info as to why we wrote this in App.js and used useEffect, see article 8.2 @ 09:25
  setAuthToken(localStorage.token);
}

const App = () => {
  
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  
  return (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path='/' component={ Landing }/>
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path='/register' component={ Register }/>
            <Route exact path='/login' component={ Login }/>
            <Route exact path='/profiles' component={ Profiles }/>
            <Route exact path='/profile/:id' component={ Profile }/>
            <PrivateRoute exact path='/dashboard' component={ Dashboard }/>
            <PrivateRoute exact path='/create-profile' component={ CreateProfile }/>
            <PrivateRoute exact path='/edit-profile' component={ EditProfile }/>
            <PrivateRoute exact path='/add-experience' component={ AddExperience }/>
            <PrivateRoute exact path='/add-education' component={ AddEducation }/>
            <PrivateRoute exact path='/posts' component={ Posts }/>
            <PrivateRoute exact path='/posts/:id' component={ Post }/>
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>

  )
};

export default App;
