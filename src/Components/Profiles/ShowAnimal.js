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
    

    render() {
        const critter = this.props.animals.find(animal => {
            return animal._id === this.props.id;
        })
        console.log(critter);
        return (
            <div className="single-animal-container">
                <div className="single-animal">
                
                    <div className="animal-title">
                        <h1>Hello everyone! My name is {critter.name}!</h1>
                    </div>

                    <div classname="single-animal-img">
                        <img src={critter.image} alt="animal" />
                    </div>

                    <div className="singleAnimal-info">
                        <p>{critter.age}</p>
                    </div>
                    
                </div>

                <div className="single-animal-editremove">
                    <p>Need to change some of my information?</p>
                    <EditAnimal critter={critter} handleSubmit={this.handleSubmit} />
                    <button onClick={() => this.props.destroyAnimal(critter._id)} className="remove-button">Remove Animal</button>
                </div>
            </div>
        )
    }
}

export default withRouter(AnimalProfile);