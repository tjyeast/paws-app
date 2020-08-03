import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class AddAnimal extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            image: "",
            image2: "",
            image3: "",
            image4: "",
            name: "",
            age: ""
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className="add-animal-form">
                <form onSubmit={(e) => this.props.handleSubmit(e, this.state)}>

                    <p>Copy and Paste the url of the image<br></br>
                    *required
                    <input type="text"
                        name="image"
                        value={this.state.image}
                        placeholder="url of image here"
                        onChange={this.handleChange}
                        className="img-url-box"
                    /></p>

                    <p>Copy and Paste the url of the image<br></br>
                    *optional
                    <input type="text"
                        name="image2"
                        value={this.state.image2}
                        placeholder="url of image here"
                        onChange={this.handleChange}
                        className="img-url-box"
                    /></p>

                    <p>Copy and Paste the url of the image<br></br>
                    *optional
                    <input type="text"
                        name="image3"
                        value={this.state.image3}
                        placeholder="url of image here"
                        onChange={this.handleChange}
                        className="img-url-box"
                    /></p>

                    <p>Copy and Paste the url of the image<br></br>
                    *optional
                    <input type="text"
                        name="image4"
                        value={this.state.image4}
                        placeholder="url of image here"
                        onChange={this.handleChange}
                        className="img-url-box"
                    /></p>

                    <p>Your critters adorable name here<br></br>
                    *required
                    <input type="text"
                        name="name"
                        value={this.state.name}
                        placeholder="animal name"
                        onChange={this.handleChange}
                        className="text-form-field"
                    /></p>

                    <p>Exact or approxiamate age is fine!<br></br>
                    *required
                    <input type="text"
                        name="age"
                        value={this.state.age}
                        placeholder="animal age"
                        onChange={this.handleChange}
                        className="text-form-field"
                    /></p>

                    <div className="add-animal-field">
                        <input type="submit"
                            value="Add Animal"
                            className="edit-button-field"
                        />
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(AddAnimal);