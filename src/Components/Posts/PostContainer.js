import React, { Component } from 'react';
import { fetchAllPosts, editPost, } from '../../services/apihelper';
import { Route, Link, withRouter } from 'react-router-dom';


import EditPost from './EditPost';
import AnimalProfileContainer from '../Profiles/AnimalProfileContainer'

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

    edit = (id) => {
        const editPost = this.state.posts;
        const updatedPost = editPost.map(post => {
            if(post._id === id) {post.edit = true}
            else {post.edit = false}
            return post
        })
        this.setState({
            posts: updatedPost
        })
    }


    render() {
        console.log(this.state.posts)
        return (
            <div className="post-page">
                <div className="post-container">
                    <div className="main-post">
                        {this.state.posts && this.state.posts.map(post => {
                            return <div className="post-holder"> <Link to={`/post/show/${post._id}`} className="post-link">
                                <img src={post.image} alt="animal" width="25%" className="post-image"/>
                                <p className="post-text">{post.post}</p>
                                <p>{post.animal.name}</p>
                                </Link>
                                <div className="edit-post">
                                    
                                    <div className="edit-post">
                                        <button onClick={() => {this.edit(post._id)}} className="post-edit">Edit Post</button>
                                        {post.edit && <EditPost
                                            id={this.props.user.id}
                                            post={post}
                                            updatePost={this.updatePost}
                                            postId={post._id}
                                        />}
                                    </div>
                                                                    
                            </div>
                        </div>
                        })}

                    </div>

                </div>
                    <div className="post-nav-main">
                        <img src="/foxphone.png" alt="nav" width="35%" className="post-nav-image" />
                            {this.props.user && <div className="post-nav-links">
                                <Link to="/profile" className="post-nav">Profile <img src="/parrot.png" alt="link" width="5%" /> </Link>
                                <Link to="/new" className="post-nav">Create New Post <img src="/kittencat.png" alt="link" width="5%" /> </Link>
                                <Link to="/critter" className="post-nav">Your Critters <img src="/fish.png" alt="link" width="5%" /> </Link>
                                </div>
                            }
                    </div>                    

                    <Route path="/critter/all" render={() => {
                        return <AnimalProfileContainer user={this.props.user} animals={this.props.animals}/>
                    }}/>
            </div>
        )
    }
}

export default withRouter(PostContainer);
