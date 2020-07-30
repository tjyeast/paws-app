import React, { Component } from 'react';

class UserDescription extends Component {
    constructor(props) {
        super(props);

        this.state={
            body: ""
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
                <input type="text"
                name="body"
                value={this.state.body}
                placeholder="Enter your description here"
                onChange={this.handleChange}
                />
                <input type="submit"
                value="Add Description"
                />
            </form>
        )
    }
}

export default UserDescription;