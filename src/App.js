import React, {Component} from 'react';
import { Route, Link, withRouter } from 'react-router-dom';

//apihelper functions
import {registerUser, loginUser, verifyUser, editUser, addCritter, fetchCrittersByUser, fetchAllPosts } from './services/apihelper'

//custom components
import Login from './Components/Users/Login';
import Register from './Components/Users/Register';
import PostContainer from './Components/Posts/PostContainer';
import ProfileContainer from './Components/Profiles/ProfileContainer';
import AddAnimal from './Components/Animals/AddAnimal';
import AnimalProfile from './Components/Profiles/AnimalProfile';
import ShowPost from './Components/Posts/ShowPost'

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
      console.log(animals);
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

handleEdit = async (e, values)=> {
  e.preventDefault();
  const editedUser = await editUser(this.state.currentUser.id, values);
  this.setState({
    currentUser: editedUser
  })
  this.props.history.push('/profile');
}

addAnimal = async (e, values) => {
  e.preventDefault();
  const newCritter = await addCritter(values, this.state.currentUser.id);
  console.log(newCritter);
  const animals = this.state.animals;
  animals.push(newCritter.data);
  this.setState({
    animals
  })
  this.props.history.push('/profile')
}

async componentDidMount() {
  const currentUser = await verifyUser();
  if(currentUser) {
    this.setState({
      currentUser: currentUser,
    })
    console.log(currentUser);
    this.pageSetup(currentUser);
  }
}


  render() {
    return (
      <div>
        <header>
          <nav>
              {this.state.currentUser ? 
              <button onClick={this.handleLogout}>Logout</button> : (
              <div>
                <Link to="/register">SignUp</Link>
                <Link to="/login">Login</Link>
              </div>
            )}
            {this.state.currentUser && <Link to="/profile">Profile</Link>}
            <Link to="/">Home</Link>
          </nav>
        </header>
        

        <div>
          <Route path="/register" render={() => {
            return <Register handleSubmit={this.handleRegister} />
            }}
          />
          
          <Route path="/login" render={() => {
            return <Login handleSubmit={this.handleLogin} />
            }}
          />
          
          <Route  path="/profile" render={() => {
            return <div>
              {this.state.currentUser && <ProfileContainer user={this.state.currentUser} handleEdit={this.handleEdit} />}
            </div>
            }}
          />

          <Route exact path="/" render={() => {
            return <PostContainer />
            }}
          />

          {this.state.currentUser &&
            <Route path='/animal/create' render={() => {
                      return <AddAnimal handleSubmit={this.addAnimal}
                      user={this.state.currentUser.id}/>
            }}/>
          }

          <Route exact path='/animal/show/:id' render={(props) => {
              return <AnimalProfile animals={this.state.animals} id={props.match.params.id} />
          }}/>
          
          <Route exact path='/post/show/:id' render={(props) => {
                  return <ShowPost 
                      post={this.state.posts} 
                      id={props.match.params.id}
                      destroyPost={this.destroyPost}
                  />
              }}/>
          
        </div>
      </div>
    )
  }
}


export default withRouter(App);
