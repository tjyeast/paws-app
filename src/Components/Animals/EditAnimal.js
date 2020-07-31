import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class EditAnimal extends Component {
    constructor(props) {
        super(props);
        this.state={
            name: this.props.critter.name,
            image: this.props.critter.image,
            image2: this.props.critter.image2,
            image3: this.props.critter.image3,
            image4: this.props.critter.image4,
            age: this.props.critter.age
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
                value={this.state.image}
                placeholder="url of image here"
                onChange={this.handleChange}
            /><br></br><br></br>

            <text>Copy and Paste the url of the image</text><br></br>
            <text>*optional</text>
            <input type="text"
                name="image2"
                value={this.state.image2}
                placeholder="url of image here"
                onChange={this.handleChange}
            /><br></br><br></br>

            <text>Copy and Paste the url of the image</text><br></br>
            <text>*optional</text>
            <input type="text"
                name="image3"
                value={this.state.image3}
                placeholder="url of image here"
                onChange={this.handleChange}
            /><br></br><br></br>

            <text>Copy and Paste the url of the image</text><br></br>
            <text>*optional</text>
            <input type="text"
                name="image4"
                value={this.state.image4}
                placeholder="url of image here"
                onChange={this.handleChange}
            /><br></br><br></br>

            <text>Your critters adorable name here</text><br></br>
            <text>*required</text>
            <input type="text"
                name="name"
                value={this.state.name}
                placeholder="animal name"
                onChange={this.handleChange}
            /><br></br><br></br>

            <text>Exact or approxiamate age is fine!</text><br></br>
            <text>*required</text>
            <input type="text"
                name="age"
                value={this.state.age}
                placeholder="animal age"
                onChange={this.handleChange}
            /><br></br><br></br>

            <input type="submit"
                value="Edit Animal"
            />
        </form>
        )
    }
}

export default withRouter(EditAnimal);