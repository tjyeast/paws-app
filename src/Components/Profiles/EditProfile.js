import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class EditProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.user.name,
            username: this.props.user.username,
            email: this.props.user.email
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <form onSubmit={(e) => this.props.handleEdit(e, this.state)}>
                <h2>Need to change your profile info? Just change the information listed below!</h2>
                <text>Current name </text><br></br>
                <input type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                /><br></br><br></br>
                <text>Current username!</text><br></br>
                <input type="text" 
                    name="username" 
                    value={this.state.username}
                    onChange={this.handleChange}
                /><br></br><br></br>
                <text>Current email</text><br></br>
                <input type="text"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                /><br></br><br></br>
                <input type="submit" 
                    value="Submit Changes"
                />
            
            </form>
        )
    }
}

export default withRouter(EditProfile);