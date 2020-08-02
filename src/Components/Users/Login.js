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
            <div className="loginform">
                <form onSubmit={(e) => this.props.handleSubmit(e, this.state)} className="login">
                    <h2>Login</h2>
                    <p>Username<br></br>
                        <input type="text" 
                            name="username" 
                            value={this.state.username}
                            placeholder="Username"
                            onChange={this.handleChange}
                        />
                    </p>

                    <p>Password<br></br>
                        <input type="password" 
                            name="password" 
                            placehold="Password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />                    
                    </p>
    
                    <input type="submit" 
                        value="Login"
                    />
                
                </form>
            </div>
        )
    }
}

export default withRouter(Loginform);