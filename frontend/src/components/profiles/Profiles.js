import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from  'react-redux'
import Spinner from '../layout/Spinner'
import ProfileItem from './ProfileItem'
import { getProfiles } from '../../actions/profile'

const Profiles = ({ getProfiles, profileprop: { profiles, pinged } }) => {
  
  useEffect(() => {         //put profiles into the state by fetching from backend
    getProfiles();
  }, [getProfiles]);
  
  return (
    <Fragment>
      { !pinged ? <Spinner /> :
      <Fragment>
        <h1 className='large text-primary'>Developers</h1>
        <p className='lead'>
          <i className='fab fa-connectdevelop'></i> Browse and connect with Developers
        </p>
        <div className="profiles">
          { !pinged ? <Spinner /> :
            profiles.length > 0 ? (
              profiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile} />       // profile={profile} means pass in that particular map() element 'profile' from profiles as a value to profile= and we are passing that as a prop to this component. So, the ProfileItem becomes a child to Profile component
              ))
            ) : <h4>No Profiles found...</h4>
          }
        </div>
      </Fragment>  }
    </Fragment>
  )
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profileprop: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profileprop: state.profile            //assign 'profile state' to profileprop (one of the children of global state) from Global state;  it is generally written as profile: state.profile but for easy understanding, I've changed it to profileprop to distinguish
})

/*                                             action (provides a function which this component can use to dispatch actions to the Store)
                                                  ↓     */                                         
export default connect(mapStateToProps, { getProfiles })(Profiles);
/*                         ↑
                        bring in global state from Redux Store and map it to props */
                        
// Store is a state container which holds the app's state, see client/public folder/state object tree for details
                    