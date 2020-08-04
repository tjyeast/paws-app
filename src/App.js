import React, {Component} from 'react';
import './App.css';
import { Route, Link, withRouter, } from 'react-router-dom';

//apihelper functions
import {registerUser, loginUser, verifyUser, fetchCrittersByUser, fetchAllPosts, addCritter, createPost, deletePost } from './services/apihelper'

//custom components
import Login from './Components/Users/Login';
import Register from './Components/Users/Register';
import PostContainer from './Components/Posts/PostContainer';
import ProfileContainer from './Components/Profiles/ProfileContainer';
import AnimalProfileContainer from './Components/Profiles/AnimalProfileContainer';
import AddAnimal from './Components/Animals/AddAnimal';
import CreatePostForm from './Components/Posts/CreatePostForm';
import ShowPost from './Components/Posts/ShowPost';

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
  this.props.history.push('/post');
}

handleLogout = () => {
  this.setState({
    currentUser: null
  })
  localStorage.removeItem('authToken');
  this.props.history.push('/post');
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

addAnimal = async (e, values) => {
  e.preventDefault();
  const newCritter = await addCritter(values, this.state.currentUser.id);
  const animals = this.state.animals;
  animals.push(newCritter.data);
  this.setState({
    animals
  })
  this.props.history.push('/profile')
}

newPost = async (e, values) => {
  e.preventDefault();
  const newPost = await createPost(values, this.state.currentUser.id);
  console.log(newPost);
  const posts = this.state.posts;
  posts.push(newPost.data);
  this.setState({
      posts: posts
  })
  this.props.history.push('/post')
}

destroyPost = async(id) => {
  await deletePost(id);
  const allPosts = this.state.posts;
  const remainingPosts = allPosts.filter(post => {
      return post.id !== id
  })
  this.setState({
      posts: remainingPosts
  })
  this.props.history.push('/post');
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
            {this.state.currentUser && <Link to="/post" className="nav-links">Home</Link>}
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

          <Route path="/post" render={() => {
            return <PostContainer user={this.state.currentUser} animals={this.state.animals}/>
            }}
          />
          <Route path="/critter" render={() => {
            return <AnimalProfileContainer user={this.state.currentUser.id} animals={this.state.animals} />
          }} />

          <Route path='/create' render={() => {
                return <AddAnimal handleSubmit={this.addAnimal}
                user={this.state.currentUser.id} animals={this.state.animals}/>
          }}/>

          <Route path="/new" render={() => {
              return <CreatePostForm handleSubmit={this.newPost}
                user={this.state.currentUser.id}/>
          }}/>

          <Route exact path='/show/:id' render={(props) => {
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
