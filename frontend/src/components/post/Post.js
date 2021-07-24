import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import { getPost } from '../../actions/post'
import PostItem from '../posts/PostItem'
import CommentItem from '../post/CommentItem'
import CommentForm from './CommentForm'

const Post = ({ getPost, post: { post, pinged }, match}) => {
  
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id])
  
  return (
    pinged === false ? <Spinner /> :
    <Fragment>
      <Link to='/posts' className='btn'>Back to Posts</Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      <div className="comments">
        {post.comments.map(comment => (
          <CommentItem key={comment._id} comment={comment} postId={post._id}/>
        ))}
      </div>
    </Fragment>
  )
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(mapStateToProps, { getPost })(Post)
