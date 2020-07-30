import React, { Component } from 'react';

class PostContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }
    }

    render() {
        return (
            <div>
                <p>Posts go Here</p>
            </div>
        )
    }
}

export default PostContainer;