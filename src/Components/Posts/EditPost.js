import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

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
                    className="img-url-box"
                />
                <textarea 
                    name="post"
                    value={this.state.post}
                    onChange={this.handleChange}
                    className="textarea-field"
                />
                <input type="submit" value="Submit Post" className="edit-button-field" />
            </form>
        )
    }
}

export default withRouter(EditPost);