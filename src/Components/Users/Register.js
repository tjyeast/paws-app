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
            <div className="registerform">
                <form onSubmit={(e) => this.props.handleSubmit(e, this.state)} className="registration">
                    <h2>Register</h2>
                    <p>Your name or your business name<br></br>
                    *required*
                    <input type="text"
                        name="name"
                        value={this.state.name}
                        placeholder="Your name Here!"
                        onChange={this.handleChange}
                    /></p>
                    <p>Pick a username!<br></br>
                    *required*
                    <input type="text" 
                        name="username" 
                        value={this.state.username}
                        placeholder="Username"
                        onChange={this.handleChange}
                    /></p>
                    <p>Make a Password<br></br>
                    *required*
                    <input type="password" 
                        name="password" 
                        placehold="Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    /></p>
                    <p>Contact email<br></br>
                    *required*
                    <input type="text"
                        name="email"
                        value={this.state.email}
                        placeholder="email@email.com"
                        onChange={this.handleChange}
                    /></p>
                    <p>Select account type<br></br>
                    *required*
                        <label>
                            <input type="radio"
                                name="type"
                                value="business"
                                checked={this.state.type === "business"}
                                onChange={this.handleChange}
                            />
                            Business
                        </label>
                        <label>
                            <input type="radio"
                                name="type"
                                value="personal"
                                checked={this.state.type === "personal"}
                                onChange={this.handleChange}
                            />
                            Personal
                        </label>
                    </p>
                    <input type="submit" 
                        value="Register"
                    />
                
                </form>
            </div>
        )
    }
}

export default withRouter(Registerform);