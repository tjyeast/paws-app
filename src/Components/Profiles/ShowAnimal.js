import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import EditAnimal from '../Animals/EditAnimal';

import { editCritter } from '../../services/apihelper';

class ShowAnimal extends Component {
    constructor(props) {
        super(props);
        
        this.state={
            animals: this.props.animals,
            critter: null,
            id: null
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const editAnimal = await editCritter(this.state.critter._id, this.state.critter);
        this.setState({
            critter: editAnimal
        })
        this.props.history.push(`/profile`)
    }

    handleChange = (e) => {
        const updateCritter = this.state.critter;
        updateCritter[e.target.name] = e.target.value
        this.setState({
            critter: updateCritter
        })
    } 
    
    componentDidMount() {
        const critter = this.state.animals.find(animal => {
            return animal._id === this.props.id;
        })
        this.setState ({
            critter,
            id: this.props.id
        })
    }

   static getDerivedStateFromProps(props, state) {
        if(props.id !== state.id) {
            const critter = state.animals.find(animal => {
                return animal._id === props.id;
            })
            return {critter, id: props.id}
        }
   } 

    render() {
        return (
            <div className="single-animal-container">
                {this.state.critter &&
                <>
                <div className="single-animal-container" id="animal-title">
                    <h1>Hello everyone! My name is {this.state.critter.name}!</h1>
                </div>

                     <div className="single-animal">
                    
                        <div className="single-animal-stats">
                            
                            <div className="animal-stats" id="animal-img">
                                <img src={this.state.critter.image} alt="animal" width="100%" className="stats-main-image"  />
                            </div>

                            <div className="animal-stats" id="animal-stats-list">
                                <p>{this.state.critter.description}</p>
                                <p>Age: {this.state.critter.age}</p>
                                <p>Type: {this.state.critter.type}</p>
                            </div>
                            <div className="image-gallery">
                                <img src={this.state.critter.image2} alt="gallery" className="image-gallery-single" width="20%"/>
                                <img src={this.state.critter.image3} alt="gallery" className="image-gallery-single" width="20%"/>
                                <img src={this.state.critter.image4} alt="gallery" className="image-gallery-single" width="20%"/>
                            </div>
                    </div>
                

                    <div className="single-animal-editremove">
                        <p>Need to change some of my information?</p>
                        <EditAnimal critter={this.state.critter} handleSubmit={this.handleSubmit} id={this.state.critter._id} handleChange={this.handleChange}/>
                        <button onClick={() => this.props.destroyAnimal(this.state.critter._id)} className="remove-button">Remove Animal</button>
                    </div>
                </div>
                </>
                }
            </div>
        )
    }
}

export default withRouter(ShowAnimal);