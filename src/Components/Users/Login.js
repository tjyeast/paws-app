import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Loginform extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
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
                <h2>Login</h2>
                <text>Username</text><br></br>
                <input type="text" 
                    name="username" 
                    value={this.state.username}
                    placeholder="Username"
                    onChange={this.handleChange}
                /><br></br><br></br>
                <text>Password</text><br></br>
                <input type="password" 
                    name="password" 
                    placehold="Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                />
                <br></br><br></br>
                <input type="submit" 
                    value="Login"
                />
            
            </form>
        )
    }
}

export default withRouter(Loginform);