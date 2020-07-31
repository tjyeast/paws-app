import React, { Component } from 'react';

class EditPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            image: this.props.post.image,
            post: this.props.post.post,
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }




    render() {
        return (
            <form onSubmit={(e) => this.props.updatePost(e, this.props.postId, this.state)}>
                
                <input type="text"
                    name="image"
                    value={this.state.image}
                    onChange={this.handleChange}
                />
                <input type="text"
                    name="body"
                    value={this.state.post}
                    onChange={this.handleChange}
                />
                <input type="submit" value="Submit Post" />
            </form>
        )
    }
}

export default EditPost;