import React, { Component } from 'react';
import { fetchAllPosts, createPost, editPost, deletePost } from '../../services/apihelper';
import { Route, Link, withRouter } from 'react-router-dom';

import CreatePostForm from './CreatePostForm';
import EditPost from './EditPost';

class PostContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }
    }

    async componentDidMount() {
        const posts = await fetchAllPosts();
        this.setState({
            posts
        })
    }
       
    updatePost = async(e, id, values) => {
        e.preventDefault();
        const updatedPost = await editPost(id, values);
        const allPosts = this.state.posts;
        console.log(updatedPost)
        const editedPost = allPosts.map(post => {
            return post.id === parseInt(id) ? updatedPost : post
        })        
        this.setState({
            posts: editedPost
        })
        this.props.history.push('/');
    }


    render() {
        return (
            <div>
                {this.state.posts && this.state.posts.map(post => {
                    return <div> <Link to={`/post/show/${post._id}`}>
                        <img src={post.image} alt="animal" width="200px" height="200px" />
                        <p>{post.post}</p>
                        <p>{post.animal.name}</p>
                        </Link>
                        <Link to={`/post/edit/${post._id}`}>Edit Post</Link>
                        <Route path='/post/edit/:id'
                            render={(props) => {
                            return <EditPost  
                            id={this.props.user.id}
                            post={post}
                            updatePost={this.updatePost}
                            postId={post._id}
                        />
                    }}
                />
                    </div>
                })} 
                <div>
                <Link to="/new/post">Create New Post</Link>
                   
                
            
            </div>
            </div>
        )
    }
}

export default withRouter(PostContainer);