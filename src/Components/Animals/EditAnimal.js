import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class EditAnimal extends Component {
    constructor(props) {
        super(props);

    }




    render() {

        return (
            <form onSubmit={(e) => this.props.handleSubmit(e)}>

            <p>Copy and Paste the url of the image<br></br>
            *required
            <input type="text"
                name="image"
                value={this.props.critter.image}
                placeholder="url of image here"
                onChange={this.props.handleChange}
                className="img-url-box"
            /></p>

            <p>Copy and Paste the url of the image<br></br>
            *optional
            <input type="text"
                name="image2"
                value={this.props.critter.image2}
                placeholder="url of image here"
                onChange={this.props.handleChange}
                className="img-url-box"
            /></p>

            <p>Copy and Paste the url of the image<br></br>
            *optional
            <input type="text"
                name="image3"
                value={this.props.critter.image3}
                placeholder="url of image here"
                onChange={this.props.handleChange}
                className="img-url-box"
            /></p>

            <p>Copy and Paste the url of the image<br></br>
            *optional
            <input type="text"
                name="image4"
                value={this.props.critter.image4}
                placeholder="url of image here"
                onChange={this.props.handleChange}
                className="img-url-box"
            /></p>

            <p>Your critters adorable name here<br></br>
            *required
            <input type="text"
                name="name"
                value={this.props.critter.name}
                placeholder={this.props.critter.name}
                onChange={this.props.handleChange}
                className="text-form-field"
            /></p>

            <p>Critter type<br></br>
            <input type="text"
                name="type"
                value={this.props.critter.type}
                placeholder={this.props.critter.type}
                onChange={this.props.handleChange}
                className="text-form-field"
            /></p>

            <p>Critter description<br></br>
            <textarea type="text"
                name="description"
                value={this.props.critter.description}
                placeholder={this.props.critter.description}
                onChange={this.props.handleChange}
                className="textarea-field"
            /></p>

            <p>Exact or approximate age is fine!<br></br>
            *required
            <input type="text"
                name="age"
                value={this.props.critter.age}
                placeholder="animal age"
                onChange={this.props.handleChange}
                className="text-form-field"
            /></p>

            <div className="edit-animal-button">
                <input type="submit"
                    value="Edit Animal"
                    className="edit-button-field"
                />
            </div>
        </form>
        )
    }
}

export default withRouter(EditAnimal);
