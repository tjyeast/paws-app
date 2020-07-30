import React, { Component } from 'react';
import { fetchCrittersByUser, fetchUserDescription, fetchCritterDescription, verifyUser } from '../../services/apihelper';

class ProfileContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            animals: null,
            userDescription: null,
            animalDescription: null,
        }
    }

    pageSetup = async(user) => {
        let animals;
        if(user) {
            animals = await (fetchCrittersByUser(this.props.user.id))
            console.log(animals);
            // (async () => {animals.forEach((animal, index) => {
            //     const animalDescription = await(fetchCritterDescription(animal._id)); 
            //     animals[index].description = animalDescription;
            // })});
            animals.map( async (animal) => {
                const animalDescription = await(fetchCritterDescription(animal._id)); 
                animal.description = animalDescription;
                return animal
            })
        }
        const userDescription = await(fetchUserDescription(this.props.user.id));
        // const animalDescription = await(fetchCritterDescription(animals[0]._id));
         this.setState({
             animals,
             userDescription,
            //  animalDescription
         })
    }

    async componentDidMount() {
        const user = verifyUser();
        this.pageSetup(user);
    }
   

    render() {
        return (
            <div>
                <h2>{this.props.user.name}'s Profile</h2>
                <p>{this.props.user.username}</p>

                <h2>Your Furfoots</h2>
                {this.state.animals && this.state.animals.map(critter => {
                    return <div>
                        <img src={critter.image} alt="doggo" width="100px" height="100px" />
                        <p>{critter.name}</p>
                        <p>{critter.age}</p>
                        <p>{critter.description}</p>
                    </div>
                })}

            </div>
        )
    }
}

export default ProfileContainer;