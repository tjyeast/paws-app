import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class EditProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.user.name,
            username: this.props.user.username,
            email: this.props.user.email,
            description: this.props.user.description,
            contact: this.props.user.contact,
            address: this.props.user.address,
            hours: this.props.user.hours
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

                <p>Current name<br></br>
                <input type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                /></p>

                <p>Current username!<br></br>
                <input type="text"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                /></p>

                <p>Current email<br></br>
                <input type="text"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                /></p>

                <p>Sanctuary/Rescue Description<br></br>
                <textarea type="text"
                    name="description"
                    value={this.state.description}
                    placeholder="Non-profile? Rescue? Adotions?"
                    onChange={this.handleChange}
                    className="textarea-field"
                /></p>

                <p>Current contact info for you organization<br></br>
                <input type="text"
                    name="contact"
                    value={this.state.contact}
                    onChange={this.handleChange}
                /></p>

                <p>Current address of your organiztion<br></br>
                <input type="text"
                    name="address"
                    value={this.state.address}
                    onChange={this.handleChange}
                /></p>

                <p>Current hours of operation<br></br>
                <input type="text"
                    name="hours"
                    value={this.state.hours}
                    onChange={this.handleChange}
                /></p>

                <input type="submit"
                    value="Submit Changes"
                />

            </form>
        )
    }
}

export default withRouter(EditProfile);
