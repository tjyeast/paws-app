import React, {Component} from 'react';
import './App.css';
import { Route, Link, withRouter, Switch } from 'react-router-dom';

//apihelper functions
import {registerUser, loginUser, verifyUser, fetchCrittersByUser, fetchAllPosts, } from './services/apihelper'

//custom components
import Login from './Components/Users/Login';
import Register from './Components/Users/Register';
import PostContainer from './Components/Posts/PostContainer';
import ProfileContainer from './Components/Profiles/ProfileContainer';
import AnimalProfileContainer from './Components/Profiles/AnimalProfileContainer';
import Routes from './Components/Routes/Routes';

class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        currentUser: null,
        animals: null,
        posts: null,
      }
    }

pageSetup = async(currentUser) => {
  let animals;
  if(currentUser) {
      animals = await (fetchCrittersByUser(this.state.currentUser.id));
      const posts = await (fetchAllPosts());
      this.setState({
        animals: animals,
        posts: posts
      })
    }
  }


handleRegister = async (e, user) => {
  e.preventDefault();
  const loadedUser = await registerUser(user);
  this.setState({
    currentUser: loadedUser
  })
  this.props.history.push('/profile');
}

handleLogin = async (e, user) => {
  e.preventDefault();
  const loadedUser = await loginUser(user);
  this.setState({
    currentUser: loadedUser
  })
  this.props.history.push('/');
}

handleLogout = () => {
  this.setState({
    currentUser: null
  })
  localStorage.removeItem('authToken');
  this.props.history.push('/');
}

async componentDidMount() {
  const currentUser = await verifyUser();
  if(currentUser) {
    this.setState({
      currentUser: currentUser,
    })
    this.pageSetup(currentUser);
  }
}


  render() {
    return (
      <div className="app">
        <header className="main-header">
          <img src="/kitty.png" alt="logo" width="10%" />
          <h1 className="website-title">Paws Claws and Jaws!</h1>
          <img src="/coyote.png" alt="coyote" width="10%" />
          <nav className = "main-nav">

              {this.state.currentUser ?
              <button className="nav-links" id="logout" onClick={this.handleLogout}>Logout</button> : (
              <div className="nav-links">
                <Link to="/register" className="nav-links">SignUp</Link>
                <Link to="/login" className="nav-links">Login</Link>
              </div>
            )}
            <div className="nav-links">
            {this.state.currentUser && <Link to="/" className="nav-links">Home</Link>}
            </div>
          </nav>
        </header>


        <div>
          <Route exact path="/register" render={() => {
            return <Register handleSubmit={this.handleRegister} />
            }}
          />

          <Route exact path="/login" render={() => {
            return <Login handleSubmit={this.handleLogin} />
            }}
          />

          <Route path="/profile" render={() => {
            return <div>
              {this.state.currentUser && <ProfileContainer user={this.state.currentUser} />}
            </div>
            }}
          />

          <Route exact path="/" render={() => {
            return <PostContainer user={this.state.currentUser} animals={this.state.animals}/>
            }}
          />
          <Route path="/critter" render={() => {
            return <AnimalProfileContainer user={this.state.currentUser.id} animals={this.state.animals} />
          }} />

        </div>
      </div>
    )
  }
}


export default withRouter(App);
