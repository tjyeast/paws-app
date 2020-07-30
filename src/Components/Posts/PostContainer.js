import React, { Component } from 'react';
import { fetchAllPosts } from '../../services/apihelper';
import { Route, Link, withRouter } from 'react-router-dom';

class PostContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }
    }

    async componentDidMount() {
        const posts = await fetchAllPosts();
        console.log(posts)
        this.setState({
            posts
        })
    }

    render() {
        return (
            <div>
                {this.state.posts && this.state.posts.map(post => {
                    return <div>
                        <img src={post.image} alt="animal" width="200px" height="200px" />
                        <p>{post.post}</p>
                        <p>{post.user.name}</p>
                        <p>{post.animal.name}</p>
                    </div>
                })}
            </div>
        )
    }
}

export default PostContainer;