import React, { Component } from 'react';
import { fetchCrittersByUser, fetchUserDescription, fetchCritterDescription, verifyUser, addUserDescription, addCritter } from '../../services/apihelper';
import EditProfile from './EditProfile';
import Description from './Description';
import AnimalProfile from './AnimalProfile';
import AddAnimal from '../Animals/AddAnimal'
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
            animals.map( async (animal) => {
                const animalDescription = await(fetchCritterDescription(animal._id)); 
                animal.description = animalDescription;
                return animal
            })
        }
        const userDescription = await(fetchUserDescription(this.props.user.id));
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
                
                {this.state.userDescription && this.state.userDescription.map(description => {
                    return <p>{description.body}</p>
                })}
                <p>Need to add a description of yourself or your sanctuary?</p>
                <Link to='/user/profile/description'>Add Description</Link>
                <Route path="/useer/profile/description" render={() => {
                    return <Description user={this.props.user} />
                }} />

                <h2>Your Critters</h2>
                <p>Have a new Critter to add to your menagerie?</p>
                <Link to='/animal/create'>New Critter</Link>
                
                {this.state.animals && this.state.animals.map(critter => {
                    return <div><Link to={`/profile/animal/${critter._id}`}>
                                <img src={critter.image} alt="doggo" width="300px" height="300px" /></Link>
                                <Route exact path='/profile/animal/:id' render={(props) => {
                                    return <AnimalProfile critter={critter} />
                                }}/>
                           </div>
                           
                })}
            </div>         
        )
    }
}

export default ProfileContainer;