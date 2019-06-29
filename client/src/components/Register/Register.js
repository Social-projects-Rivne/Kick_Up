import React, { Component } from "react";
import { connect } from "react-redux";

import is from 'is_js';

import { Grid, TextField, Button, Typography } from '@material-ui/core';
import { Person, Send, Email, Lock } from '@material-ui/icons';
import { registerUser } from "./../../store/actions/authentication";
import { enqueueSnackbar } from "./../../store/actions/toast";

const PASSWORD_LENGTH = 6;
const messageType = {
    SUCCESS: 'success',
    INFO: 'info',
    ERR: 'error'
};

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            emailInputValid: true,
            passwordInputValid: true,
            message: false,
            messageType: null,
            messageOpened: false,
            // @todo, this will help interact bg with input for tablet+ breakpoints;
            formInFocus: false
        };
        this.submitHandler = this.submitHandler.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
        this.doValidation = this.doValidation.bind(this);
    }
    
    doValidation() {
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
    }
    updateInputValue(evt) {
        this.setState({
          [evt.target.name]: evt.target.value,
          [evt.target.name + 'InputValid']: true
        });
    }
    submitHandler(submitEvt) {
        submitEvt.preventDefault();

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
        const { email, password } = this.state;
        const user = {
            email,
            password
        }

        this.props.registerUser(user);

        // must delete in future if we don't need App state
        this.props.userHasAuthenticated(true);
        this.props.setUser(user);
    }

    componentDidMount() {
        if (this.props.isAuthenticated) {
            this.props.history.push({
                pathname: "/profile/" + this.props.user.id +"/edit",
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.user !== this.props.user) {
            this.props.history.push({
                pathname: "/profile/" + this.props.user.id +"/edit",
            });
        }
    }
    
    render() {
        return (
            <Grid
                className="register"
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid item xs={10} sm={6} className="register__info">
                    <h1>Let's kick up</h1>
                    <hr />
                    <Typography variant="body1" className="register__info-text">
                        Sign up and get in touch with people of same interests.
                        Stay tuned it to all interesting event nearby!
                    </Typography>
                </Grid>
                <Grid item xs={10} sm={6} className="register__form">
                    <Typography align="center" variant="h4">
                        <Person fontSize="large" />
                        Sign up
                    </Typography>
                    <hr />
                    <div className="register__field-wrapper">
                        <Email />
                        <TextField
                            value={this.state.email}
                            onChange={this.updateInputValue}
                            required
                            error={!this.state.emailInputValid}
                            className="input"
                            name="email"
                            label="Your email"
                            type="email"
                            margin="normal"
                            autoComplete="off"
                        />
                    </div>
                    <div className="register__field-wrapper">
                        <Lock />
                        <TextField
                            value={this.state.password}
                            onChange={this.updateInputValue}
                            required
                            error={!this.state.passwordInputValid}
                            className="input"
                            name="password"
                            label="Enter password, min. 6 chars"
                            type="password"
                            margin="normal"
                            autoComplete="new-password"
                        />
                    </div>
                    <div className="register__btn-wrapper">
                        <Button
                            className="register__submit-btn"
                            variant="outlined"
                            onClick={this.submitHandler}
                            disabled={this.state.messageOpened}
                        >
                            Send
                            <Send />
                        </Button>
                    </div>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
})
const mapDispatchToProps = dispatch => ({
    registerUser: user  => dispatch(registerUser(user)),
    enqueueSnackbar: notifications => dispatch(enqueueSnackbar(notifications)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Register);
