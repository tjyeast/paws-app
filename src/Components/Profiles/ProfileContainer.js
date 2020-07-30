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
        }
        const userDescription = await(fetchUserDescription(this.props.user.id));
        const animalDescription = await(fetchCritterDescription(this.state.animals.id));
         this.setState({
             animals,
             userDescription,
             animalDescription
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
                        <img src={critter.image} alt="doggo" width="25px" height="25px" />
                        <p>{critter.name}</p>
                        <p>{critter.age}</p>
                    </div>
                })}

            </div>
        )
    }
}

export default ProfileContainer;