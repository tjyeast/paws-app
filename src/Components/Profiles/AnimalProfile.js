import React, { Component } from 'react';

class AnimalProfile extends Component {
    constructor(props) {
        super(props);
    
    }
    

    render() {
        console.log(this.props.critter)
        return (
            <div>
                <p>hello world</p>
                <h1>{this.props.critter.name}</h1>
            </div>
        )
    }
}

export default AnimalProfile;