import React, { Component } from 'react';

class AnimalProfile extends Component {
    constructor(props) {
        super(props);
    
    }
    

    render() {
        console.log(this.props.critter)
        return (
            <div>
                <p>{this.props.critter.name}</p>
            </div>
        )
    }
}

export default AnimalProfile;