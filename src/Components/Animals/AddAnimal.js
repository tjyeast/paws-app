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
            <form onSubmit={(e) => this.props.handleSubmit(e, this.state)}>

                <text>Copy and Paste the url of the image</text><br></br>
                <text>*required</text>
                <input type="text"
                    name="image"
                    placeholder="url of image here"
                /><br></br><br></br>

                <text>Copy and Paste the url of the image</text><br></br>
                <text>*optional</text>
                <input type="text"
                    name="image2"
                    placeholder="url of image here"
                /><br></br><br></br>

                <text>Copy and Paste the url of the image</text><br></br>
                <text>*optional</text>
                <input type="text"
                    name="image3"
                    placeholder="url of image here"
                /><br></br><br></br>

                <text>Copy and Paste the url of the image</text><br></br>
                <text>*optional</text>
                <input type="text"
                    name="image4"
                    placeholder="url of image here"
                /><br></br><br></br>

                <text>Your critters adorable name here</text><br></br>
                <text>*required</text>
                <input type="text"
                    name="name"
                    placeholder="animal name"
                /><br></br><br></br>

                <text>Exact or approxiamate age is fine!</text><br></br>
                <text>*required</text>
                <input type="text"
                    name="age"
                    placeholder="animal age"
                /><br></br><br></br>

                <input type="submit"
                    value="Add Animal"
                />
            </form>
        )
    }
}

export default withRouter(AddAnimal);