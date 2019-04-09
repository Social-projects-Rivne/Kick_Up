import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";

import PageContainer from "./PageContainer/PageContainer";
import Router from "./../router";

class App extends Component {
  state = {
    isAuthenticated: false
  };

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    return (
      <BrowserRouter>
        <PageContainer 
          isAuthenticated={this.state.isAuthenticated}
          userHasAuthenticated={this.userHasAuthenticated}>
          <Router childProps={childProps}/>
        </PageContainer>
      </BrowserRouter>
    );
  }
}

export default App;
