import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class CreatePostForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            image: "",
            post: ""
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className="add-post-form">
                <form onSubmit={(e) => this.props.handleSubmit(e, this.state)}>
                    <h2>Create Your Post!</h2>
                    <p>*optional
                    <input type="text"
                        name="image"
                        value={this.state.image}
                        placeholder="url of your image here"
                        onChange={this.handleChange}
                        className="img-url-box"
                    /></p>
                    <p>*required
                    <textarea type="text"
                        name="post"
                        value={this.state.post}
                        placeholder="What do you have to say?"
                        onChange={this.handleChange}
                        className="textarea-field"
                    /></p>
                    <input type="submit"
                        value="Create Post"
                        className="edit-button-field"
                    />
                </form>
            </div>
        )
    }
}

export default withRouter(CreatePostForm);