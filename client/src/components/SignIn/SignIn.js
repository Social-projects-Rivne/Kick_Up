import React, { Component } from "react";
import axios from "axios";
import qs from 'query-string';
import is from "is_js";
import { connect } from "react-redux";

import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { Person, Send, Email, Lock } from "@material-ui/icons";
import CustomizedSnackbars from "../Toast/Toast";
import { signInUser } from './../../store/actions/authentication';
import { enqueueSnackbar } from './../../store/actions/toast';

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
    formInFocus: false,
    forgotPasswordForm: false,
    recoveryPasswordForm: false,
    mailMessage: false,
    reset_token: ""
  };

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push({
        pathname: "/",
      });
    }
    const { reset_token } = qs.parse(this.props.location.search);
    this.setState({ reset_token })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isAuthenticated !== this.props.isAuthenticated) {
        this.props.history.push({
            pathname: "/",
        });
    }
}

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
      this.props.enqueueSnackbar({
        message: 'Please correct fields highlighted with red',
        options: {
          key: new Date().getTime() + Math.random(),
          variant: messageType.ERR,
        },
      });
      return;
    }

    // Send data;
    const { email, password } = this.state;
    const user = {
      email,
      password
    };
    this.props.signInUser(user);
  };

  forgotPassword = () => {
    this.setState({ forgotPasswordForm: true, mailMessage: true });
  };
  showEmailMessage = () => {
    const { email } = this.state;

    if (email) {
      axios
        .post("/api/forgot-password", { email })
        .then(res => {
          this.setState({ forgotPasswordForm: false, mailMessage: true });
        })
        .catch(() => {
          this.props.enqueueSnackbar({
            message: 'Incorrect email!',
            options: {
              key: new Date().getTime() + Math.random(),
              variant: messageType.ERR,
            },
          });
        });
    }
  };
  resetForm = () => {
    this.setState({
      forgotPasswordForm: false,
      recoveryPasswordForm: false,
      mailMessage: false
    });
  }
  recoveryPassword = () => {
    const { password, reset_token } = this.state;
    if (password && reset_token) {
      axios
        .patch("/api/forgot-password", { password, reset_token })
        .then(() => {
          this.setState({
            forgotPasswordForm: false,
            recoveryPasswordForm: false,
            mailMessage: false,
            reset_token: ""
          })
          this.props.history.push({
            pathname: "/sign-in",
          });
        })
        .catch(() => {
          this.props.enqueueSnackbar({
            message: 'Something went wrong!',
            options: {
              key: new Date().getTime() + Math.random(),
              variant: messageType.ERR,
            },
          });
        });
    }
  }

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
    const mailMessage = (
      <Grid item xs={10} sm={6} className="sign-in__form">
        <Typography align="center" variant="h4">
          <Person fontSize="large" />
          Check your email
      </Typography>
        <hr />
        <div className="sign-in__field-wrapper">
          <div className="sign-in__btn-wrapper">
            <Typography
              align="center"
              variant="body1"
              className="mailMessage"
            >
              We send you email to confirm your account or go to:
        </Typography>
            <Button
              align="center"
              variant="outlined"
              className="mailMessage sign-in__submit-btn"
              onClick={this.resetForm}
            >
              sign In
        </Button>
          </div>
        </div>
      </Grid>
    );
    const signin = (
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
          <Typography
            variant="body1"
            className="forgot_Password_link"
            onClick={this.forgotPassword}
          >
            forgot Password
            </Typography>
        </div>
      </Grid>
    );
    const forgotPass = (
      <Grid item xs={10} sm={6} className="sign-in__form">
        <Typography align="center" variant="h4">
          <Person fontSize="large" />
          Forgot Password
            </Typography>
        <hr />
        <div className="sign-in__field-wrapper">
          <Email />
          <TextField
            required
            className="input"
            name="email"
            label="Write your email"
            type="email"
            margin="normal"
            autoComplete="off"
            value={this.state.email}
            onChange={this.handleInputChange}
            error={!this.state.emailInputValid}
          />
        </div>
        <div className="sign-in__btn-wrapper">
          <Button
            className="sign-in__submit-btn"
            variant="outlined"
            onClick={this.showEmailMessage}
            disabled={this.state.messageOpened}
          >
            Send
                <Send />
          </Button>
          {renderMailMessage}

        </div>
      </Grid>
    );
    const recoveryPass = (
      <Grid item xs={10} sm={6} className="sign-in__form">
        <Typography align="center" variant="h4">
          <Person fontSize="large" />
          Create new password
            </Typography>
        <hr />
        <div className="sign-in__field-wrapper">
          <Lock />
          <TextField
            required
            className="input"
            name="password"
            label="Enter new password, min. 6 chars"
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
            onClick={this.recoveryPassword}
            disabled={this.state.messageOpened}
          >
            Send
                <Send />
          </Button>
        </div>
      </Grid>
    )
    let renderForm;
    let renderMailMessage;
    if (this.state.forgotPasswordForm) {
      renderForm = forgotPass
    } else if (this.state.mailMessage) {
      renderForm = mailMessage
    } else if (this.state.reset_token) {
      renderForm = recoveryPass
    } else {
      renderForm = signin
    }

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
          {renderForm}

        </Grid>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.auth.errors,
});

const mapDispatchToProps = dispatch => ({
  signInUser: user => dispatch(signInUser(user)),
  enqueueSnackbar: notifications => dispatch(enqueueSnackbar(notifications))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);