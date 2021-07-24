import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileGithub from './ProfileGithub'
import { getProfileById } from '../../actions/profile'

const Profile = ({ getProfileById, profile: { viewprofile, pinged2 }, auth, match }) => {
  
  useEffect(() => {
    getProfileById(match.params.id);          //pass in the id from URL
  }, [getProfileById, match.params.id])
  
  return (
    <Fragment>
      {!pinged2 ? <Spinner /> :
        <Fragment>
          <Link to='/profiles' className='btn btn-light'>Back to Profiles</Link>
          {auth.isAuthenticated && auth.loading === false && auth.user._id === viewprofile.user._id && (<Link to='/edit-profile' className='btn btn-dark'>Edit Profile</Link>)}
          <div className='profile-grid my-1'>
            <ProfileTop viewprofile={viewprofile}/>
            <ProfileAbout viewprofile={viewprofile}/>
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {viewprofile.experience.length > 0 ? (<Fragment>
                {
                  viewprofile.experience.map(exp => (
                    <ProfileExperience key={exp._id} exp={exp} />
                  ))
                }
              </Fragment>) : (<h4>No Experience Credentials</h4>)}
            </div>
            
            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {viewprofile.education.length > 0 ? (<Fragment>
                {
                  viewprofile.education.map(edu => (
                    <ProfileEducation key={edu._id} edu={edu} />
                  ))
                }
              </Fragment>) : (<h4>No Education Credentials</h4>)}
            </div>
            
            {viewprofile.githubusername && (
              <ProfileGithub username={viewprofile.githubusername}/>
            )}
            
          </div>
        </Fragment>}
    </Fragment>
  )
}

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth                    //we need auth obj from auth state because if the profile we're viewing matches the logged in user, we want to show edit profile button
})

export default connect(mapStateToProps, { getProfileById })(Profile)
