import React, {Component} from 'react';

//apihelper functions
import {registerUser, loginUser, verifyUser } from './services/apihelper'

//custom components
import Login from './Components/Users/Login';
import Register from './Components/Users/Register';
import PostContainer from './Components/Posts/PostContainer';
import ProfileContainer from './Components/Profiles/ProfileContainer';

class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        currentUser: null
      }
    }

handleRegister = async (e, user) => {
  e.preventDefault();
  const loadedUser = await registerUser(user);
  this.setState({
    currentUser: loadedUser
  })
}

handleLogin = async (e, user) => {
  e.preventDefault();
  const loadedUser = await loginUser(user);
  this.setState({
    currentUser: loadedUser
  })
}

handleLogout = () => {
  this.setState({
    currentUser: null
  })
  localStorage.removeItem('authToken');
}

async componentDidMount() {
  const currentUser = await verifyUser();
  if(currentUser) {
    this.setState({
      currentUser: currentUser
    })
  }
}


  render() {
    return (
      <div>
        <nav>
         
          {this.state.currentUser ? <button onClick={this.handleLogout}>Logout</button> : (
            <div>
              <Register handleSubmit={this.handleRegister} />
              <Login handleSubmit={this.handleLogin} />
            </div>
          )}
        </nav>
        <div>
          <PostContainer />
          {this.state.currentUser &&
          <ProfileContainer user={this.state.currentUser} /> }
        </div>
      </div>
    )
  }
}


export default App;
