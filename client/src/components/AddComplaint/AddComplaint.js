import React, { Component } from 'react';
import { connect } from "react-redux";
import { enqueueSnackbar } from '../../store/actions/toast';

import {
    Button,
    Fab,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    TextField
} from '@material-ui/core';
import axios from 'axios';

const minMessageLength = 6;
const messageType = {
    SUCCESS: "success",
    INFO: "info",
    ERR: "error"
};

const URI = {
    ROOM: 'room',
    EVENT: 'event'
};

class Addcomplaint extends Component {
    state = {
        entityType: null,
        entityId: null,
        entityTitle: '',
        redirectUrl: '/',
        message: ''
    }
    handleUpdateData (event) {
        this.setState({ message: event.target.value });
    }
    handleSubmitBtnClick = () => {
        let uriParam = null;
        let { entityId, entityTitle, message, entityType, redirectUrl } = this.state;

        // Validate data, if not ok, redirect user back or to main page;
        if (!entityId || !message || !entityType) {
            this.props.history.push(redirectUrl);
            this.props.showToast(`Please enter room or event to complain, and click "Complain" icon`, messageType.ERR);
        } else {
            // Send data;
            if (this.state.entityType === 1) {
                uriParam = URI.ROOM;
            } else if (this.state.entityType === 2) {
                uriParam = URI.EVENT;
            }

            axios
            .post(`/api/admin/${uriParam}/complaint/create`, {
                text: message,
                entity_id: entityId
            })
            .then(() => {
                this.props.history.push(redirectUrl);
                this.props.showToast('Thank you for reporting, we will review your complaint', messageType.SUCCESS);
            })
            .catch(err => {
                let errors = err.response.data.error.errors;
                for (const key in errors) {
                    this.props.showToast(errors[key][0], messageType.ERR);
                }
            })
        }
        
    }
    componentWillMount = () => {
        if (this.props.location.state) {
            let { entityType, entityId, entityTitle, redirectUrl } = this.props.location.state;
            redirectUrl = redirectUrl || '/';

            // In case we don't have required data, quit;
            if (
                !entityType ||
                !entityId ||
                !entityTitle ||
                !this.props.user
            ) {
                this.props.history.push(redirectUrl);
                this.props.showToast(`Please login, enter room or event to complain on, click 'Complain' button`, messageType.ERR);
            } else {
                this.setState({ entityType, entityId, entityTitle, redirectUrl });
            }
        } else {
            this.props.history.push('/');
            this.props.showToast(`Please enter room or event to complain, and click "Complain" icon`, messageType.ERR);
        }
    }
    render() {
        return (
            <section className="add-complaint">
                    <form 
                        className="add-complaint__form" 
                        noValidate 
                        autoComplete="off"
                        onSubmit={submitEvt => { submitEvt.preventDefault()} }
                    >
                        <label className="add-complaint__title">To add a complaint, check data and fill in field below:</label>
                        <Stepper nonLinear orientation="vertical" className="add-complaint__stepper">
                            <Step 
                                className='add-complaint__step  add-complaint__step_filled'
                                key={0} 
                                active={true}
                            >
                                    <StepLabel className="add-complaint__step-label">You are about to report:</StepLabel>
                                    <StepContent>
                                        <div>
                                            <TextField
                                                className="add-complaint__text-field"
                                                name="title"
                                                value={this.state.entityTitle}
                                                fullWidth
                                                autoComplete="off"
                                            />
                                        </div>
                                    </StepContent>
                                </Step>
                                <Step 
                                    className={ 
                                        this.state.message.length > minMessageLength 
                                        ? 'add-complaint__step  add-complaint__step_filled' 
                                        : 'add-complaint__step' 
                                    }
                                    key={1} 
                                    active={true} >
                                    <StepLabel className="add-complaint__step-label">Tell us your complaint, be specific:</StepLabel>
                                    <StepContent>
                                        <TextField
                                            required
                                            className="add-complaint__text-field"
                                            name="description"
                                            placeholder="Min 6 symbols"
                                            onChange={event => this.handleUpdateData(event)}
                                            value={this.state.message}
                                            fullWidth
                                            multiline
                                            autoComplete="off"
                                            inputProps={{ maxLength: 1000 }}
                                        />
                                    </StepContent>
                                </Step>
                        </Stepper>
                    </form>
                    <Button
                        className={this.state.message.length > minMessageLength ? 'add-complaint__submit-btn' : 'add-complaint__submit-btn  add-complaint__submit-btn_disabled'}
                        variant="outlined"
                        onClick={this.handleSubmitBtnClick}
                        >
                        Send complaint
                    </Button>
                </section>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
});
  
const mapDispatchToProps = dispatch => ({
    showToast: (message, variant) => dispatch(enqueueSnackbar({
        message,
        options: { variant }
    }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Addcomplaint);