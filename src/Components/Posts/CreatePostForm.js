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
            <form onSubmit={(e) => this.props.handleSubmit(e, this.state)}>
                <h2>Create Your Post!</h2>
                <text>*optional</text>
                <input type="text"
                    name="image"
                    value={this.state.image}
                    placeholder="url of your image here"
                    onChange={this.handleChange}
                /><br></br><br></br>
                <text>*required</text>
                <input type="text"
                    name="post"
                    value={this.state.post}
                    placeholder="What do you have to say?"
                    onChange={this.handleChange}
                    width="500px"
                    height="200px"
                /><br></br><br></br>
                <input type="submit"
                    value="Create Post"
                />
            </form>
        )
    }
}

export default withRouter(CreatePostForm);