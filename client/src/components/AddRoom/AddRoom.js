import React from 'react';

import { TextField, Input, FormControlLabel, Switch, FormGroup, Button, NativeSelect,
    InputLabel, FormControl, InputAdornment, Grid, Stepper, Step, StepLabel, StepContent } from '@material-ui/core';
import { CloudUpload, Link } from '@material-ui/icons';

class AddRoom extends React.Component {
    state = {
        available: true,
        invite: false,
        members_limit: false,

        activeStep: 0,
        roomData: {
            title: '',
            description: '',
            category: 0,
            tags: 0,
            members_limit: '',
        },
        roomId: 1,
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    handleUpdateData (event) {
        this.setState({
            roomData:{
                ...this.state.roomData,
                [event.target.name]: event.target.value
            }
        });
    }

    handleNext = () => {
        const { activeStep } = this.state;
        this.setState({
            activeStep: activeStep + 1
        });

        switch (this.state.activeStep) {
            case 0:
                //ToDo Create room
                console.log(this.state);
                break;
            case 1:
                //ToDo upload cover and invite members
                this.props.history.push({ pathname: "/room/" + this.state.roomId });
                break;
            default:
                console.log("Unknown step");
                break;
        }
    };

    render() {
        const { activeStep  } = this.state;

        return (
            <div className="add-room-page">
                <form className="add-room-page-container">
                    <label className="add-room-header">Please fill in all fields to create room</label>
                    <Stepper activeStep={activeStep} orientation="vertical" className="add-room-stepper">
                        <Step key={0}>
                            <StepLabel>Room info</StepLabel>
                            <StepContent>
                                <div>
                                    <TextField
                                        className="add-room-text-field"
                                        label="Title"
                                        name="title"
                                        onChange={event => this.handleUpdateData(event)}
                                        value={this.state.roomData.title}
                                        fullWidth
                                        autoComplete="off"
                                        inputProps={{ maxLength: 70 }}
                                    />

                                    <TextField
                                        className="add-room-text-field"
                                        label="Description"
                                        name="description"
                                        onChange={event => this.handleUpdateData(event)}
                                        value={this.state.roomData.description}
                                        fullWidth
                                        multiline
                                        autoComplete="off"
                                        inputProps={{ maxLength: 200 }}
                                    />

                                    <FormControl className="formControl">
                                        <InputLabel shrink htmlFor="age-native-label-placeholder">
                                            Category
                                        </InputLabel>
                                        <NativeSelect
                                            value={this.state.category}
                                            name="category"
                                            onChange={event => this.handleUpdateData(event)}
                                            input={<Input name="category" />}
                                            className="add-room-select"
                                        >
                                            <option value="">none</option>
                                            <option value={10}>sport</option>
                                            <option value={20}>music</option>
                                            <option value={30}>education</option>
                                            <option value={40}>films</option>
                                        </NativeSelect>
                                    </FormControl>

                                    <FormControl className="formControl">
                                        <InputLabel shrink htmlFor="age-native-label-placeholder">
                                            Tags
                                        </InputLabel>
                                        <NativeSelect
                                            value={this.state.roomData.tags}
                                            name="tags"
                                            onChange={event => this.handleUpdateData(event)}
                                            input={<Input name="tags" />}
                                            className="add-room-select"
                                        >
                                            <option value="">none</option>
                                            <option value={10}>sport</option>
                                            <option value={20}>music</option>
                                            <option value={30}>education</option>
                                            <option value={40}>films</option>
                                        </NativeSelect>
                                    </FormControl>

                                    <FormGroup className="add-room-text-field">
                                        <FormControlLabel
                                            label="Private room"
                                            control={
                                                <Switch
                                                    checked={this.state.available}
                                                    onChange={this.handleChange('available')}
                                                    value="available"
                                                />
                                            }
                                        />
                                    </FormGroup>

                                    <FormGroup className="add-room-invite-members">
                                        <FormControlLabel
                                            className="invite-members"
                                            label="Members limits"
                                            control={
                                                <Switch
                                                    checked={this.state.members_limit}
                                                    onChange={this.handleChange('members_limit')}
                                                    value="members_limit"
                                                />
                                            }
                                        />

                                        {this.state.members_limit && <div className="invite-link">
                                            <FormControl  className="textField">
                                                <TextField
                                                    className="add-room-text-field"
                                                    label="Members limit"
                                                    name="members_limit"
                                                    onChange={event => this.handleUpdateData(event)}
                                                    value={this.state.roomData.members_limit}
                                                    fullWidth
                                                    //variant="filled"
                                                    autoComplete="off"
                                                />
                                            </FormControl>
                                        </div>}
                                    </FormGroup>
                                </div>
                                <div>
                                    <Button
                                        variant="contained"
                                        onClick={this.handleNext}
                                        className="add-room-button-create"
                                    >
                                        Save and continue
                                    </Button>
                                </div>
                            </StepContent>
                        </Step>
                        <Step key={1}>
                            <StepLabel>Invite members and upload cover</StepLabel>
                            <StepContent>
                                <div>
                                    <FormGroup className="add-room-invite-members">
                                        <FormControlLabel
                                            className="invite-members"
                                            label="Invite members"
                                            control={
                                                <Switch
                                                    checked={this.state.invite}
                                                    onChange={this.handleChange('invite')}
                                                    value="invite"
                                                />
                                            }
                                        />

                                        {this.state.invite && <div className="invite-link">
                                            <FormControl  className="textField">
                                                <TextField
                                                    defaultValue="Invite Link"
                                                    InputProps={{
                                                        readOnly: true,
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <Link />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </FormControl>
                                        </div>}
                                    </FormGroup>

                                    <Grid container spacing={24}>
                                        <Grid item md={12}>
                                            <Button variant="contained" className="add-room-button-upload">
                                                <CloudUpload />&nbsp;&nbsp;
                                                <span>Upload cover</span>
                                                <input id="upload" type="file"
                                                   onChange={(event)=> {
                                                       if (!event.target.files.length) {
                                                           return;
                                                       }
                                                       event.target.previousSibling.textContent = event.target.files[0].name;
                                                   }}
                                                />
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </div>
                                <div>
                                    <Button
                                        variant="contained"
                                        onClick={this.handleNext}
                                        className="add-room-button-update-cover"
                                    >
                                        Create room
                                    </Button>
                                </div>
                            </StepContent>
                        </Step>
                    </Stepper>
                </form>
            </div>
        );
    }
}

export default AddRoom;
