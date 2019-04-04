import React, { Component } from "react";
import ReactTypingEffect from 'react-typing-effect';
import '../../styles/Register.scss';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            sendingRequest: false,
            // @todo, this will help interact bg with input for tablet+ breakpoints;
            formInFocus: false
        };
        this.submitHandler = this.submitHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }
    sendFormData() {

    }
    submitHandler(submitEvt) {
        submitEvt.preventDefault();

        this.setState({sendingRequest: true});
        submitEvt.target.className += " was-validated";
    }
    changeHandler(event) {
        this.setState({[event.target.name]: event.target.value });
    }

    render() {
        return (
            <div></div>
        )
    }
}

export default Register;