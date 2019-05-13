import React, { Component } from "react";
import axios from "axios";

import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { Person, Send, Email, Lock } from "@material-ui/icons";
import is from "is_js";
import { withSnackbar } from 'notistack';
import CustomizedSnackbars from "../Toast/Toast";
import setAuthToken from '../../setAuthToken';

const PASSWORD_LENGTH = 6;
const messageType = {
  SUCCESS: "success",
  INFO: "info",
  ERR: "error"
};

class Login extends Component {
  state = {
    email: "",
    password: "",
    emailInputValid: true,
    passwordInputValid: true,
    message: false,
    messageType: null,
    messageOpened: false,
    // @todo, this will help interact bg with input for tablet+ breakpoints;
    formInFocus: false
  };
  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    // Validate data;
    const res = this.doValidation();
    if (!res) {
      this.showToast('Please correct fields highlighted with red', messageType.ERR);
      return;
    }
    // Do changes in UI;
    this.showToast('Working', messageType.INFO);

    // Send data;
    const { email, password } = this.state;
    const user = {
      email,
      password
    };
    axios
      .post("/api/signin", user)
      .then(res => {
        const { token } = res.data;
        this.props.userHasAuthenticated(true);
        setAuthToken(token);
        localStorage.setItem("authorization", token);
        return axios.get('api/profile')
      })
      .then((res) => {
        //TODO decide with team if this action is necessary
        if (res.data && res.data.email) {
          return  res.data;
        }
        throw new Error('There is no user.');
      })
      .then(user => {
        this.showToast('Welcome!', messageType.SUCCESS);
        this.setState({
          email: "",
          password: "",
          emailInputValid: true,
          passwordInputValid: true,
          formInFocus: false
        }, () => setTimeout(() => {
          console.log('sigin', this.props.setUser, {user})
          this.props.setUser(user);
          this.props.history.push({
            pathname: "/",
          });
        }, 500))})
      .catch(err => {
        this.showToast('Incorrect username or password!', messageType.ERR);
      });
  };

  showToast = (message, variant) => {
    this.props.enqueueSnackbar(message, {
        variant: variant ? variant : 'default',
    });
  }
  
  resetToast = () => {
    this.setState({
      message: false,
      messageType: null,
      messageOpened: false,
      emailInputValid: true,
      passwordInputValid: true
    });
  };

  //validation
  doValidation = () => {
    let result = true;

    // Validate email;
    if (!is.email(this.state.email)) {
      result = false;
      this.setState({ emailInputValid: false });
    }

    // Validate password;
    if (this.state.password.length < PASSWORD_LENGTH) {
      result = false;
      this.setState({ passwordInputValid: false });
    }

    return result;
  };
  render() {
    return (
      <div>
        <Grid
          className="sign-in"
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={10} sm={6} className="sign-in__info">
            <h1>Let's kick up</h1>
            {this.state.messageType && (
              <CustomizedSnackbars
                variant={this.state.messageType}
                message={this.state.message}
                open={this.state.messageOpened}
                resetToast={this.resetToast}
              />
            )}
            <hr />
            <Typography variant="body1" className="sign-in__info-text">
              Please Sign In!
            </Typography>
          </Grid>
          <Grid item xs={10} sm={6} className="sign-in__form">
            <Typography align="center" variant="h4">
              <Person fontSize="large" />
              Sign in
            </Typography>
            <hr />
            <div className="sign-in__field-wrapper">
              <Email />
              <TextField
                required
                className="input"
                name="email"
                label="Your email"
                type="email"
                margin="normal"
                autoComplete="off"
                value={this.state.email}
                onChange={this.handleInputChange}
                error={!this.state.emailInputValid}
              />
            </div>
            <div className="sign-in__field-wrapper">
              <Lock />
              <TextField
                required
                className="input"
                name="password"
                label="Enter password, min. 6 chars"
                type="password"
                margin="normal"
                autoComplete="off"
                value={this.state.password}
                onChange={this.handleInputChange}
                error={!this.state.emailInputValid}
              />
            </div>
            <div className="sign-in__btn-wrapper">
              <Button
                className="sign-in__submit-btn"
                variant="outlined"
                onClick={this.handleSubmit}
                disabled={this.state.messageOpened}
              >
                Send
                <Send />
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withSnackbar(Login);
