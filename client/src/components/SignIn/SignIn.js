import React, { Component } from 'react';

import { loginUser } from './../../authentication';
import { Grid, TextField, Button, Typography } from '@material-ui/core';
import { Person, Send, Email, Lock } from '@material-ui/icons';
import CustomizedSnackbars from '../Toast/Toast';
import './SignIn.scss';

class Login extends Component {
    state = {
        email: '',
        password: '',
        formErrors: { email: '', password: '' },
        emailValid: false,
        passwordValid: false,
        formValid: false
    }
    handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        },
            () => { this.validateField(name, value) }
        );
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        const user = {
            email,
            password,
        }
        loginUser(user);
    }

    //validation
    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;

        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '' : ' is too short';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }
    validateForm() {
        this.setState({ formValid: this.state.emailValid && this.state.passwordValid });
    }
    errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
    }
    render() {
        console.log('this.props', this.props);
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
                        {this.state.messageType &&
                            this.state.messageType &&
                            <CustomizedSnackbars
                                variant={this.state.messageType}
                                message={this.state.message}
                                open={this.state.messageOpened}
                                resetToast={this.resetToast}
                            ></CustomizedSnackbars>
                        }
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
                            />
                        </div>
                        <div className="panel panel-default">
                            <FormErrors formErrors={this.state.formErrors} />
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
                            />
                        </div>
                        <div className="sign-in__btn-wrapper">
                            <Button
                                className="sign-in__submit-btn"
                                variant="contained"
                                color="primary"
                                onClick={this.handleSubmit}
                                disabled={!this.state.formValid}
                            >
                                Send
                        <Send />
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Login;

const FormErrors = ({ formErrors }) =>
    <div className='formErrors'>
        {Object.keys(formErrors).map((fieldName, i) => {
            if (formErrors[fieldName].length > 0) {
                return (
                    <p key={i}>{fieldName} {formErrors[fieldName]}</p>
                )
            } else {
                return '';
            }
        })}
    </div>