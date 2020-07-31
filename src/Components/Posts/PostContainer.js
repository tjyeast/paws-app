import React, { Component } from 'react';
import { fetchAllPosts, createPost, editPost, deletePost } from '../../services/apihelper';
import { Route, Link, withRouter } from 'react-router-dom';

import CreatePostForm from './CreatePostForm';
import EditPost from './EditPost';
import ShowPost from './ShowPost'

class PostContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }
    }

    async componentDidMount() {
        const posts = await fetchAllPosts();
        console.log(posts);
        this.setState({
            posts
        })
    }

    createPost = async (e, values) => {
        e.prevenDefault();
        const newPost = await createPost(values);
        const posts = this.state.posts;
        posts.push(newPost.data);
        this.setState({
            posts: posts            
        })
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
        const editedPost = allPosts.map(post => {
            return post.id === parseInt(id) ? updatedPost : post
        })        
        this.setState({
            posts: editedPost
        })
        this.props.history.push('/posts');
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
                    </div>
                })} 
                <div>

                <Route exact path="/posts/new" render={() => {
                    return <CreatePostForm handleSubmit={this.createPost}/>
                }}/>
                

                <Route exact path="/posts/edit/:id"
                    render={(props) => {
                        return <EditPost  
                        posts={this.state.posts}
                        updatePost={this.updatePost}
                        postId={this.state.posts._id}
                        />
                    }}
                />
                
            
            </div>
            </div>
        )
    }
}

export default PostContainer;