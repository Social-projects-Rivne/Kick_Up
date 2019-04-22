import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

import PageContainer from "./PageContainer/PageContainer";
import Router from "./../router";

class App extends Component {
  state = {
    isAuthenticated: false
  };

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }
  setAuthToken = token => {
    if (token) {
      axios.defaults.headers.common["authorization"] = token;
    } else {
      delete axios.defaults.headers.common["authorization"];
    }
  };
  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      setAuthToken: this.setAuthToken
    };
    return (
      <BrowserRouter>
        <PageContainer 
          isAuthenticated={this.state.isAuthenticated}
          userHasAuthenticated={this.userHasAuthenticated}
          setAuthToken={this.setAuthToken}
        >
          <Router childProps={childProps}/>
        </PageContainer>
      </BrowserRouter>
    );
  }
}

export default App;
