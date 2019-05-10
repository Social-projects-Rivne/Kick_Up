import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

import setAuthToken from '../setAuthToken';
import PageContainer from "./PageContainer/PageContainer";
import Router from "./../router";

if(localStorage.authorization) {
  setAuthToken(localStorage.authorization);
}

class App extends Component {
  state = {
    isAuthenticated: false,
    user: null,
  };
  componentWillMount() {
    axios.get('http://localhost:3000/api/profile')
    .then((res) => {
        //TODO decide with team if this action is necessary
        if (res.data && res.data.email) {
          return  res.data;
        }
        throw new Error('There is no user.');
      })
      .then(user => {
        this.userHasAuthenticated(true);
        this.setUser(user);
      })
      .catch(err => {
        console.log('Authtorization failed');
      });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }
  setUser = (user) => this.setState({ user }); 
  getChildProps() {
    const { isAuthenticated, user } = this.state;
    return {
      isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      setUser: this.setUser,
      user,
    }
  } 
  render() {
    return (
      <BrowserRouter>
        <PageContainer 
          isAuthenticated={this.state.isAuthenticated}
          userHasAuthenticated={this.userHasAuthenticated}
          user={this.state.user}
        >
          <Router childProps={this.getChildProps()}/>
        </PageContainer>
      </BrowserRouter>
    );
  }
}

export default App;
