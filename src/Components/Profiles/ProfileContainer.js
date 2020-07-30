import React, { Component } from 'react';
import { fetchCrittersByUser, fetchUserDescription, fetchCritterDescription, verifyUser, addUserDescription } from '../../services/apihelper';
import EditProfile from './EditProfile';
import Description from './Description';
import AnimalProfile from './AnimalProfile';
import { Route, Link, withRouter } from 'react-router-dom';

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
            animals.map( async (animal) => {
                const animalDescription = await(fetchCritterDescription(animal._id)); 
                animal.description = animalDescription;
                return animal
            })
        }
        const userDescription = await(fetchUserDescription(this.props.user.id));
        console.log(userDescription);
         this.setState({
             animals,
             userDescription,
         })
    }

    async componentDidMount() {
        const user = verifyUser();
        this.pageSetup(user);
    }

    handleSubmit = async (e, values) => {
        e.prevenDefault();
        const newDescription = await addUserDescription(values);
        this.setState({
            userDescription: newDescription
        })
    }

    render() {
        return (
            <div>
                <h2>{this.props.user.name}'s Profile</h2>
                <p>{this.props.user.username}</p>
                <p>{this.props.user.email}</p>
                {this.state.userDescription && this.state.userDescription.map(description => {
                    return <p>{description.body}</p>
                })}
                <p>Need to change this information?</p>
                <Link to="/profile/edit">Edit Profile</Link>
                <Route exact path="/profile/edit" render={() => {
                    return <EditProfile handleEdit={this.props.handleEdit}
                                user={this.props.user} />
                }}
                />
                <Description handleSubmit={this.handleSubmit} user={this.props.user.id} />

                <h2>Your Furfoots</h2>
                {this.state.animals && this.state.animals.map(critter => {
                    return <div>
                        <img src={critter.image} alt="doggo" width="300px" height="300px" />
                        <p>{critter.name}</p>
                        <p>{critter.age}</p>
                        <p>{critter.description}</p>
                        <AnimalProfile critter={this.state.animals.map(critter => { return critter;})} />
                    </div>
                })}

            </div>
        )
    }
}

export default ProfileContainer;