import React, { Component } from 'react';

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

    render() {
        return (
            <form>
                <input type="text"
                    name="image"
                    placeholder="url of image here"
                />
                <input type="text"
                    name="image1"
                    placeholder="url of image here"
                />
                <input type="text"
                    name="image2"
                    placeholder="url of image here"
                />
                <input type="text"
                    name="image3"
                    placeholder="url of image here"
                />
                <input type="text"
                    name="image4"
                    placeholder="url of image here"
                />
                <input type="text"
                    name="name"
                    placeholder="animal name"
                />
                <input type="text"
                    name="age"
                    placeholder="animal age"
                />
                <input type="submit"
                    value="Add Animal"
                />
            </form>
        )
    }
}