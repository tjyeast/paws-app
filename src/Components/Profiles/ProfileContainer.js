import React, { Component } from 'react';
import { fetchCrittersByUser, fetchUserDescription, fetchCritterDescription, verifyUser, addUserDescription,  deleteUser, editUser } from '../../services/apihelper';
import EditProfile from './EditProfile';
import Description from './Description';
import AnimalProfileContainer from './AnimalProfileContainer';
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
        console.log(animals);
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
        e.preventDefault();
        const newDescription = await addUserDescription(values);
        this.setState({
            userDescription: newDescription
        })
    }

    handleEdit = async (e, values)=> {
      e.preventDefault();
      const editedUser = await editUser(this.state.currentUser.id, values);
      this.setState({
        currentUser: editedUser
      })
      this.props.history.push('/profile');
    }


    removeUser = async (e, id) => {
        e.preventDefault();
        await deleteUser(this.props.user.id);
        this.props.history.push('/post')
    }

    render() {
        return (
            <div className="profile-container">

                <img src="/wolf.png" alt="link" width="10%" />

                    <div className="profile-main">
                    
                        <h2>{this.props.user.name}'s Profile</h2>
                        <p>{this.props.user.username}</p>
                        <p>{this.props.user.email}</p>
                        {this.state.userDescription && this.state.userDescription.map(description => {
                            return <p>{description.body}</p>
                        })}

                        {this.state.userDescription && this.state.userDescription.map(description => {
                            return <p>{description.body}</p>
                        })}

                        {!this.state.userDescription &&
                            <div>
                                <p>Need to add a description of yourself or your sanctuary?</p>
                                <Link to='/user/profile/description'>Add Description</Link>
                            </div>
                        }

                        <Route path="/user/profile/description" render={() => {
                            return <Description user={this.props.user} />
                        }} />

                        <div className="profile-edit">
                            <Link to="/profile/edit" className="profile-edit-nav">Edit Profile</Link>
                            <Route path="/profile/edit" render={() => {
                                return <EditProfile handleEdit={this.props.handleEdit}
                                            user={this.props.user} />
                            }}
                            />
                        </div>

                </div>
  
                <div className="profile-nav">
                    <img src="/foxuniverse.png" alt="nav icon" width="30%" />
                    <p className="profile-nav-text">Need to leave?</p>
                    <button onClick={this.removeUser} className="profile-remove">Remove Account</button>
                </div>
                <AnimalProfileContainer animals={this.state.animals} user={this.props.user}/>
            </div>
        )
    }
}

export default withRouter(ProfileContainer);
