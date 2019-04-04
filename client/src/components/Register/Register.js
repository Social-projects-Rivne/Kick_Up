import React, { Component } from "react";

import { Grid, TextField, Button, Typography } from '@material-ui/core';
import { Person, Send, Email, Lock } from '@material-ui/icons';
import axios from 'axios';
import CustomizedSnackbars from '../Toast/Toast';
import '../../styles/Register.scss';

// @todo change;
const USER_ROUTE = 'http://httpbin.org/post';
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
            message: false,
            messageType: null,
            messageOpened: false,
            formIsInvalid: true,
            // @todo, this will help interact bg with input for tablet+ breakpoints;
            formInFocus: false
        };
        this.submitHandler = this.submitHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.resetToast = this.resetToast.bind(this);
    }
    resetUi = () => {
        // @todo add resetUi
    }
    resetToast() {
        this.setState({
            message: false,
            messageType: null,
            messageOpened: false,
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
            .then(() => { fireCallback(true) })
            .catch((err) => { fireCallback(false) });
    }
    submitHandler(submitEvt) {
        const _this = this;
        
        submitEvt.preventDefault();
        
        // Do changes in UI;
        this.setState({
            message: 'Working',
            messageType: messageType.INFO,
            messageOpened: true
        });

        // Send data;
        this.sendFormData(function (res) { 
            
            // Show message based on response;
            _this.setState({
                message: res ? 'Welcome to RoomKa!' : 'Something went wrong :( Please retry!',
                messageType: res ? messageType.SUCCESS : messageType.ERR,
                messageOpened: true
            });
        });
    }
    changeHandler(event) {
        this.setState({ [event.target.name]: event.target.value });
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
                            required
                            error={this.state.formIsInvalid}
                            className="register__input"
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
                            required
                            error={this.state.formIsInvalid}
                            className="register__input"
                            name="password"
                            label="Enter password, min. 6 chars"
                            type="password"
                            margin="normal"
                            autoComplete="off"
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

export default Register;