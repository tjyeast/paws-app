import React, { Component } from 'react';

class Registerform extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            username: "",
            password: "",
            email: "",
            type: ""
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
                <h2>Register</h2>
                <input type="text"
                    name="name"
                    value={this.state.name}
                    placeholder="Your name Here!"
                    onChange={this.handleChange}
                />
                <input type="text" 
                    name="username" 
                    value={this.state.username}
                    placeholder="Username"
                    onChange={this.handleChange}
                />
                <input type="password" 
                    name="password" 
                    placehold="Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                />
                <input type="text"
                    name="email"
                    value={this.state.email}
                    placeholder="email@email.com"
                    onChange={this.handleChange}
                />
                <input type="text"
                    name="type"
                    value={this.state.type}
                    placeholder="Business or Personal"
                    onChange={this.handleChange}
                />
                <input type="submit" 
                    value="Register"
                />
            
            </form>
        )
    }
}

export default Registerform;