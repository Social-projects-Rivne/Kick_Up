import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

import PageContainer from "./PageContainer/PageContainer";
import Router from "./../router";

class App extends Component {
  state = {
    isAuthenticated: false,
    user: null,
  };

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }
  setAuthToken = token => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };
  setUser = (user) => this.setState({ user }); 
  getChildProps() {
    const { isAuthenticated, user } = this.state;
    return {
      isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      setAuthToken: this.setAuthToken, 
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
          setAuthToken={this.setAuthToken}
          user={this.state.user}
        >
          <Router childProps={this.getChildProps()}/>
        </PageContainer>
      </BrowserRouter>
    );
  }
}

export default App;
