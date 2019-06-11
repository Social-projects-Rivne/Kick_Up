import React, { Component } from "react";
import axios from "axios";
import qs from 'query-string';
import is from "is_js";
import { withSnackbar } from 'notistack';
import { connect } from "react-redux";

import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { Person, Send, Email, Lock } from "@material-ui/icons";
import CustomizedSnackbars from "../Toast/Toast";
import setAuthToken from '../../setAuthToken';
import { userHasAuthenticated, storeUser, authenticationError } from './../../store/actions/authentication';

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
   componentDidMount(){
    const { reset_token } = qs.parse(this.props.location.search);  
    this.setState({reset_token})
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
    //TODO: deside with team, is it necessary create signIn actionCreator for redux
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
        });
        setTimeout(() => {
          this.props.storeUser(user);
          this.props.history.push({
            pathname: "/",
          });
        }, 1000)})
      .catch((err) => {
        this.props.authenticationError(err.response || err);
        this.showToast('Incorrect username or password!', messageType.ERR);
      });
  };
  forgotPassword = () => {
    this.setState({ forgotPasswordForm: true, mailMessage: true });
  };
  showEmailMessage = () => {
    const { email } = this.state;
    
    if(email){
      axios
      .post("/api/forgot-password", {email})
      .then(res => {
      this.setState({ forgotPasswordForm: false, mailMessage: true });
      })
      .catch(() => {
        this.showToast('Incorrect email!', messageType.ERR);
      });
    }
  };
  resetForm = () =>{
    this.setState({ 
      forgotPasswordForm: false,
      recoveryPasswordForm: false,
      mailMessage: false 
    });
  }
  recoveryPassword = () => {
    const { password,reset_token } = this.state;
    if (password && reset_token) {
      axios
      .patch("/api/forgot-password", {password, reset_token})
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
        this.showToast('Something went wrong!', messageType.ERR);
      });
    }

  }
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
    } else if(this.state.mailMessage) {
      renderForm = mailMessage
    } else if(this.state.reset_token){
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
  errors: state.auth.errors,
});

const mapDispatchToProps = dispatch => ({
  userHasAuthenticated: isAuthenticated => dispatch(userHasAuthenticated(isAuthenticated)),
  storeUser: user => dispatch(storeUser(user)),
  authenticationError: err => dispatch(authenticationError(err)),
})

export default withSnackbar(connect(mapStateToProps, mapDispatchToProps)(Login));
