import React, { Component } from 'react';
import { fetchCrittersByUser, fetchUserDescription, fetchCritterDescription, verifyUser, addUserDescription,  deleteUser, editUser } from '../../services/apihelper';
import EditProfile from './EditProfile';
import AnimalProfileContainer from './AnimalProfileContainer';
import { Route, Link, withRouter } from 'react-router-dom';

class ProfileContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            animals: null,
        }
    }

    pageSetup = async(user) => {
        let animals;
        if(user) {
            animals = await (fetchCrittersByUser(this.props.user.id));
            this.setState({
              animals
            })
    }
  }

    async componentDidMount() {
        const user = verifyUser();
        this.pageSetup(user);
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
        this.props.history.push('/')
    }

    render() {
        return (
            <div className="profile-container">

                <img src="/wolf.png" alt="link" width="10%" />

                    <div className="profile-main">

                        <h2>{this.props.user.name}'s Profile</h2>
                        <p>{this.props.user.username}</p>
                        <p>{this.props.user.email}</p>
                        <p>{this.props.user.description}</p>
                        <p>{this.props.user.contact}</p>
                        <p>{this.props.user.address}</p>
                        <p>{this.props.user.hours}</p>

                        <div className="profile-edit">
                            <Link to="/profile/edit" className="profile-edit-nav">Edit Profile</Link>
                            <Route path="/profile/edit" render={() => {
                                return <EditProfile handleEdit={this.handleEdit}
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
