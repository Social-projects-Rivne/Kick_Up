import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { Provider } from 'react-redux';

import setAuthToken from '../setAuthToken';
import PageContainer from "./PageContainer/PageContainer";
import Router from "./../router";
import store from "./../store/store";
import { SnackbarProvider } from 'notistack';
import { storeUser, userHasAuthenticated, authenticationError } from "./../store/actions/authentication";

if (localStorage.authorization) {
  setAuthToken(localStorage.authorization);
}

class App extends Component {
  state = {
    isAuthenticated: false,
    user: null,
  };

  componentDidMount() {
    axios.get('http://localhost:3000/api/profile')
      .then((res) => {
        //TODO decide with team if this action is necessary
        if (res.data && res.data.email) {
          return res.data;
        }
        throw new Error('There is no user.');
      })
      .then(user => {
        store.dispatch(userHasAuthenticated(true));
        store.dispatch(storeUser(user));
      })
      .catch(err => {
        setAuthToken(null);
        store.dispatch(authenticationError(err.response || err));
        console.log('Authtorization failed', err);
      });
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <SnackbarProvider maxSnack={3}>
            <PageContainer >
              <Router />
            </PageContainer>
          </SnackbarProvider>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
