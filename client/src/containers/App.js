import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";

import PageContainer from "./PageContainer/PageContainer";
import Router from "./../router";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <PageContainer>
          <Router />
        </PageContainer>
      </BrowserRouter>
    );
  }
}

export default App;
