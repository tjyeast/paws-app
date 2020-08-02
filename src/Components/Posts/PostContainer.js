import React, { Component } from 'react';
import { fetchAllPosts, createPost, editPost, deletePost } from '../../services/apihelper';
import { Route, Link, withRouter } from 'react-router-dom';


import CreatePostForm from './CreatePostForm';
import EditPost from './EditPost';
import ShowPost from './ShowPost';
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

    newPost = async (e, values) => {
      e.preventDefault();
      const newPost = await createPost(values, this.props.user.id);
      console.log(newPost);
      const posts = this.state.posts;
      posts.push(newPost.data);
      this.setState({
          posts: posts
      })
      this.props.history.push('/')
    }

    destroyPost = async(id) => {
      await deletePost(id);
      const allPosts = this.state.posts;
      const remainingPosts = allPosts.filter(post => {
          return post.id !== id
      })
      this.setState({
          posts: remainingPosts
      })
      this.props.history.push('/');
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
                                <Link to={`/post/edit/${post._id}`} className="post-edit">Edit Post</Link>
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
                        </div>
                        })}

                        <Route exact path='/post/show/:id' render={(props) => {
                                return <ShowPost
                                    post={this.state.posts}
                                    id={props.match.params.id}
                                    destroyPost={this.destroyPost}
                                />
                            }}/>
                        {this.props.user &&
                        <Route path="/post/new" render={() => {
                                return <CreatePostForm handleSubmit={this.newPost}
                                    user={this.props.user.id}/>
                            }}/>
                        }

                    </div>

                </div>
                    <div className="post-nav-main">
                        <img src="/foxphone.png" alt="nav" width="35%" className="post-nav-image" />
                            {this.props.user && <div className="post-nav-links">
                                <Link to="/profile" className="post-nav">Profile <img src="/parrot.png" alt="link" width="5%" /> </Link>
                                <Link to="/post/new" className="post-nav">Create New Post <img src="/kittencat.png" alt="link" width="5%" /> </Link>
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
