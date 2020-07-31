import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import EditAnimal from '../Animals/EditAnimal';

import { editCritter, deleteCritter } from '../../services/apihelper';

class AnimalProfile extends Component {
    constructor(props) {
        super(props);
        
        this.state={
            animal: this.props.critter
        }
    }

    handleSubmit = async (e, id, values) => {
        e.prevenDefault();
        const editAnimal = await editCritter(this.props.critter._id, values);
        this.setState({
            animal: editAnimal
        })
        this.props.history.push(`/animal/show/${id}`)
    }

    deleteAnimal = async (e, id) => {
        e.prevenDefault();
        await deleteCritter(this.props.critter._id);
        this.props.history.push('/profile')
    }
    

    render() {
        console.log(this.props.animals);
        console.log(this.props.id);
        const critter = this.props.animals.find(animal => {
            return animal._id === this.props.id;
        })
        return (
            <div>
                <h1>Hello everyone! My name is {critter.name}!</h1>
                <img src={critter.image} alt="animal" />
                <p>{critter.age}</p>
                <p>Need to change some of my information?</p>
                <EditAnimal critter={critter} handleSubmit={this.handleSubmit} />
                <button onClick={this.deleteAnimal}
                id={critter._id}>Remove Animal</button>
            </div>
        )
    }
}

export default withRouter(AnimalProfile);