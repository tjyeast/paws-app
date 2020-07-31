import React, { Component } from 'react';

class AnimalProfile extends Component {
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
        console.log(this.props.critter)
        return (
            <div>
                <h1>Hello everyone! My name is {this.props.critter.name}!</h1>
                <img src={this.props.critter.image} alt="animal" />
            </div>
        )
    }
}

export default AnimalProfile;