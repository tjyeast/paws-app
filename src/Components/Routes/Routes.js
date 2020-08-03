import React from "react";
import { Switch, Route } from "react-router-dom";

import Login from '../Users/Login';
import Register from '../Users/Register';
import AnimalProfileContainer from '../Profiles/AnimalProfileContainer';
import PostContainer from '../Posts/PostContainer';
import EditPost from '../Posts/EditPost';
import ProfileContainer from '../Profiles/ProfileContainer';
import AddAnimal from '../Animals/AddAnimal';
import ShowAnimal from "../Profiles/ShowAnimal";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" component={PostContainer} />
      <Route path="/post/:id" component={EditPost} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/profile" component={ProfileContainer} />
      <Route path="/critter" component={AnimalProfileContainer} />
      <Route path="/create" exact component={AddAnimal} />
      <Route path="/critter/:id" component={ShowAnimal} />
    </Switch>
  );
}
