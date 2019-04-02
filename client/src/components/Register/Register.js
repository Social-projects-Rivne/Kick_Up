import React, { Component } from "react";
import { Link } from 'react-router-dom';

import { Grid, Card, Typography, Icon } from '@material-ui/core';
import { Person } from '@material-ui/icons';
import axios from 'axios';
import '../../styles/Register.scss';

// @todo change;
const USER_ROUTE = 'http://httpbin.org/post';

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
    resetUi = () => {
        // @todo add resetUi
    }
    sendFormData(callback) {
        var fireCallback = (res) => {
            if (typeof callback === 'function') callback(res);
        }

        axios.post(USER_ROUTE, {
            email: this.state.email,
            password: this.state.password
        })
        .then(() => {fireCallback(true)})
        .catch((err) => {fireCallback(false)});
    }
    submitHandler(submitEvt) {
        submitEvt.preventDefault();
        var _this = this;

        // Do changes in UI;
        // toast.info('Working...', {
        //     hideProgressBar: true,
        //     closeButton: false
        // });
        this.setState({sendingRequest: true});
        submitEvt.target.className += " was-validated";

        // Send data;
        this.sendFormData(function(res) {
            _this.setState({sendingRequest: false});

            if (res) {
                //toast.success('Welcome to roomKa', {autoClose: 5000});
            }
        });
    }
    changeHandler(event) {
        this.setState({[event.target.name]: event.target.value });
    }

    render() {
        return(
            <Grid
                className="register"
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
            <Card className="register__info">
                <h1>Let's kick up</h1>
            </Card>
            <Card className="register__form">
                <Typography align="center" variant="h3">
                    <Icon fontSize="36">person</Icon>
                    Sign up
                </Typography>
            </Card>
            </Grid>
        )
    }
}

export default Register;



// OLD CODE
// return (
//     <div className="register">
//         <MDBView className="register__wrapper">
//             <MDBMask className="d-flex justify-content-center align-items-center register__gradient">
//                 <MDBContainer>
//                     <MDBRow className="register__row">
//                         <div className="white-text text-center text-md-left col-md-6 mt-xl-5 mb-5 register__card-text">
//                             <h1 className="h1-responsive font-weight-bold">
//                                 Let's kick up
//                             </h1>
//                             <hr className="hr-light" />
//                             <h6 className="mb-4">
//                                 Sign up and get in touch with people of same interests.
//                                 Stay tuned it to all interesting event nearby!'
//                             </h6>
//                             <MDBBtn outline color="white">
//                               More about us
//                             </MDBBtn>
//                         </div>
//                         <MDBCol md="6" xl="5" className="mb-4">
//                             <MDBCard className="register__card">
//                                 <MDBCardBody className="z-depth-2 white-text">
//                                     <h3 className="text-center">
//                                       <MDBIcon icon="user" /> Sign up:
//                                     </h3>
//                                     <hr className="hr-light" />
//                                     <form
//                                         onSubmit={this.submitHandler}
//                                         className="needs-validation"
//                                     >
//                                     <MDBInput 
//                                         label="Your email"
//                                         icon="envelope"
//                                         pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$"
//                                         value = {this.state.email}
//                                         onChange={this.changeHandler}
//                                         type="email"
//                                         name="email"
//                                         data-register-user-email
//                                         required
//                                     />
//                                     <MDBInput 
//                                         label="Enter password, min. 6 chars"
//                                         icon="lock"
//                                         value = {this.state.password}
//                                         onChange={this.changeHandler}
//                                         name="password"
//                                         pattern=".{6,}"
//                                         type="password"
//                                         data-register-user-password
//                                         required
//                                     />
//                                     <div className="text-center mt-4 black-text">
//                                     <MDBBtn 
//                                         type="submit" 
//                                         color="indigo"
//                                         disabled={this.state.sendingRequest}
//                                     >
//                                         Register
//                                         <MDBIcon far icon="paper-plane  register__plane-ico" className="ml-2" />
//                                     </MDBBtn>
//                                     <hr className="hr-light" />
//                                     <div className="text-center d-flex justify-content-center white-label">
//                                         <Link to="#!" className="p-2 m-2">
//                                           <MDBIcon fab icon="twitter" className="white-text" />
//                                         </Link>
//                                         <Link to="#!" className="p-2 m-2">
//                                           <MDBIcon fab icon="linkedin-in" className="white-text" />
//                                         </Link>
//                                         <Link to="#!" className="p-2 m-2">
//                                           <MDBIcon fab icon="instagram" className="white-text" />
//                                         </Link>
//                                     </div>
//                                     </div>
//                                     </form>
//                                 </MDBCardBody>
//                             </MDBCard>
//                         </MDBCol>
//                     </MDBRow>
//                 </MDBContainer>
//             </MDBMask>
//         </MDBView>
// </div>
// )