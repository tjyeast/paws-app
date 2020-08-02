import React from "react";
import { Switch, Route } from "react-router-dom";

import Login from '../Users/Login';
import Register from '../Users/Register';
import AnimalProfileContainer from '../Profiles/AnimalProfileContainer';
import PostContainer from '../Posts/PostContainer';
import EditPost from '../Posts/EditPost';
import ProfileContainer from '../Profiles/ProfileContainer';

export default function Routes() {
  return (
    <Switch>
      <Route path="/home" component={PostContainer} />
      <Route path="/post" component={EditPost} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/profile" component={ProfileContainer} />
      <Route path="/critter" component={AnimalProfileContainer} />
    </Switch>
  );
}
