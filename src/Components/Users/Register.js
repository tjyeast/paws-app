import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

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
                <text>Your name or your business name </text><br></br>
                <text>*required*</text>
                <input type="text"
                    name="name"
                    value={this.state.name}
                    placeholder="Your name Here!"
                    onChange={this.handleChange}
                /><br></br><br></br>
                <text>Pick a username!</text><br></br>
                <text>*required*</text>
                <input type="text" 
                    name="username" 
                    value={this.state.username}
                    placeholder="Username"
                    onChange={this.handleChange}
                /><br></br><br></br>
                <text>Make a Password</text><br></br>
                <text>*required*</text>
                <input type="password" 
                    name="password" 
                    placehold="Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                /><br></br><br></br>
                <text>Contact email</text><br></br>
                <text>*required*</text>
                <input type="text"
                    name="email"
                    value={this.state.email}
                    placeholder="email@email.com"
                    onChange={this.handleChange}
                /><br></br><br></br>
                <text>You must enter if this is a business or a personal account</text><br></br>
                <text>*required*</text>
                <input type="text"
                    name="type"
                    value={this.state.type}
                    placeholder="Business or Personal"
                    onChange={this.handleChange}
                /><br></br><br></br>
                <input type="submit" 
                    value="Register"
                />
            
            </form>
        )
    }
}

export default withRouter(Registerform);