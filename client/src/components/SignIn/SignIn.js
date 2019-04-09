import React, { Component } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { Person, Send, Email, Lock } from "@material-ui/icons";
import is from "is_js";
import CustomizedSnackbars from "../Toast/Toast";

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
      this.setState({
        message: "Please correct fields highlighted with red",
        messageType: messageType.ERR,
        messageOpened: true
      });

      return;
    }
    // Do changes in UI;
    this.setState({
      message: "Working",
      messageType: messageType.INFO,
      messageOpened: true
    });
    // Send data;
    const { email, password } = this.state;
    const user = {
      email,
      password
    };
    axios
      .post("/api/signin", user)
      .then(res => {
        console.log("login response data=>", res.data);
        this.props.userHasAuthenticated(true);
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        this.setAuthToken(token);
        const decoded = jwt_decode(token);
        this.setState({
          message: res ? "Welcome!" : "Something went wrong :( Please retry!",
          messageType: res ? messageType.SUCCESS : messageType.ERR,
          messageOpened: true,
          email: "",
          password: "",
          emailInputValid: true,
          passwordInputValid: true,
          formInFocus: false
        });
        this.props.history.push({
          pathname: "/",
          state: {
            token: decoded
          }
        });
      })
      .catch(err => console.log(err));
  };
  setAuthToken = token => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };
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
    console.log("this.props", this.props);
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
                className="sign-in__input"
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
                className="sign-in__input"
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

export default Login;
