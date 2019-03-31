import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBIcon } from 'mdbreact';
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
            <MDBContainer className="register  font-weight-normal">
                <MDBRow>
                    <MDBCol className="register__form-wrapper">
                        <form
                            onSubmit={this.submitHandler}
                            className="needs-validation"
                        >
                        <p className="h2 text-center mb-4  register__title">Sign up</p>
                        <div className="grey-text">
                        <MDBInput
                            label="Your email"
                            icon="envelope"
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$"
                            group
                            value = {this.state.email}
                            onChange={this.changeHandler}
                            type="email"
                            name="email"
                            data-register-user-email
                            required
                        />
                        <MDBInput
                            label="Enter password, min. 6 chars"
                            icon="lock"
                            value = {this.state.password}
                            onChange={this.changeHandler}
                            name="password"
                            group
                            pattern=".{6,}"
                            type="password"
                            data-register-user-password
                            required
                        />
                        </div>
                        <div className="text-center">
                            <MDBBtn 
                                type="submit" 
                                color="indigo"
                                disabled={this.state.sendingRequest}
                            >
                                Register
                                <MDBIcon far icon="paper-plane  register__plane-ico" className="ml-2" />
                            </MDBBtn>
                        </div>
                    </form>
                    
                    </MDBCol>
                    <MDBCol className="register__info-container">
                        <ReactTypingEffect
                            staticText='Sign up and'
                            text={[
                                'get in touch with people of same interests',
                                'catch up with all interesting event nearby'
                            ]}
                            speed="50"
                        />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}

export default Register;