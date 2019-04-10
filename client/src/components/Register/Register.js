import React, { Component } from "react";

import axios from 'axios';
import is from 'is_js';
import { withSnackbar } from 'notistack';

import { Grid, TextField, Button, Typography } from '@material-ui/core';
import { Person, Send, Email, Lock } from '@material-ui/icons';

const USER_ROUTE = 'http://localhost:3001/api/signup';
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
        this.sendFormData = this.sendFormData.bind(this);
        this.showToast = this.showToast.bind(this);
    }
    showToast = (message, variant) => {
        this.props.enqueueSnackbar(message, {
            variant: variant ? variant : 'default',
        });
    }
    resetFormUi = () => {
        this.setState({
            email: '',
            password: '',
            emailInputValid: true,
            passwordInputValid: true,
            formInFocus: false
        });
    }
    sendFormData(callback) {
        
        const fireCallback = (res) => {
            if (typeof callback === 'function') callback(res);
        }

        axios.post(USER_ROUTE, {
            email: this.state.email,
            password: this.state.password
        })
            .then((res) => {
                fireCallback({
                    status: true,
                    details: []
                })
             })
            .catch((err) => {
                const data = err.response.data.error.errors;
                let res = [];

                //@temp for test;
                data.test = [];
                data.test.push('Manually added error for test');
                
                Object.values(data).forEach((el) => {
                    res.push(el[0]);
                });                
                
                fireCallback({
                    status: false,
                    details: res
                })
             });
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

        const _this = this;

        // Validate data;
        const res = this.doValidation();

        if (!res) {
            this.showToast('Please correct fields highlighted with red', messageType.ERR);
            return;
        }

        // Do changes in UI;
        this.showToast('Working', messageType.INFO);

        // Send data;
        this.sendFormData(function (res) {
            // Show message based on response;
            if (res && res.status) {
                _this.showToast('Welcome to RoomKa', messageType.SUCCESS);
            } else {
                try {
                    res.details.forEach(msg => {
                        _this.showToast(msg, messageType.ERR);
                    });
                } catch(err) {
                    _this.showToast('Something went wrong :( Try reload your page', messageType.ERR);
                }
            }
            _this.resetFormUi();
        });
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
                            variant="contained"
                            color="primary"
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

export default withSnackbar(Register);
