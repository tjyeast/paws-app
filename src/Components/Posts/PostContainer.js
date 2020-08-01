import React, { Component } from 'react';
import { fetchAllPosts, createPost, editPost, deletePost } from '../../services/apihelper';
import { Route, Link, withRouter } from 'react-router-dom';

import CreatePostForm from './CreatePostForm';
import EditPost from './EditPost';
import ShowPost from './ShowPost';

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
      const newPost = await createPost(values, this.state.currentUser.id);
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
            <div>
                {this.state.posts && this.state.posts.map(post => {
                    return <div> <Link to={`/post/show/${post._id}`}>
                        <img src={post.image} alt="animal" width="200px" height="200px" />
                        <p>{post.post}</p>
                        <p>{post.animal.name}</p>
                        </Link>
                        <Link to={`/post/edit/${post._id}`}>Edit Post</Link>
                        <Route exact path='/post/edit/:id'
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

                <Route exact path='/post/show/:id' render={(props) => {
                        return <ShowPost
                            post={this.state.posts}
                            id={props.match.params.id}
                            destroyPost={this.destroyPost}
                        />
                    }}/>
                {this.props.user &&
                  <Route exact path="/new/post" render={() => {
                          return <CreatePostForm handleSubmit={this.newPost}
                              user={this.props.user.id}/>
                      }}/>
                }
                <div>
                <Link to="/new/post">Create New Post</Link>



            </div>
            </div>
        )
    }
}

export default withRouter(PostContainer);
