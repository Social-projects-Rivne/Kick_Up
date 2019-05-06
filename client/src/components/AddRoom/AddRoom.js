import React from 'react';

import axios from 'axios';

import { TextField, Input, FormControlLabel, Switch, FormGroup, Button, NativeSelect,
    InputLabel, FormControl, InputAdornment, Grid, Stepper, Step, StepLabel, StepContent } from '@material-ui/core';
import { CloudUpload, Link } from '@material-ui/icons';
import Spinner from "../UI/Spinner/Spinner";

class AddRoom extends React.Component {
    state = {
        activeStep: 0,
        roomId: 1,
        userId: 0,
        loading: true,
        roomData: {
            title: '',
            description: '',
            category: 0,
            tags: 0,
            permission: false,
            invite: false,
            members_limit: 1,
            members_limit_checked: false,
        },
        addRoomDB: {
            categories: [],
            tags: [],
        }
    };

    componentDidMount() {
        axios.get("/api/category")
            .then(res => {
                this.setState({
                    addRoomDB:{
                        ...this.state.addRoomDB,
                        categories: res.data
                    }
                });

                return axios.get("/api/tag");
            })
            .then(res => {
                this.setState({
                    addRoomDB: {
                        ...this.state.addRoomDB,
                        tags: res.data
                    }
                });

                return axios.get('/api/profile');
            })
            .then(res => {
                this.setState({
                    loading: false,
                    userId: res.data.id
                });
            })
            .catch(err => {
                this.setState({ loading: false });
                console.log(err.response.data.error.errors);
            });
    };

    handleUpdateData (event) {
        this.setState({
            roomData:{
                ...this.state.roomData,
                [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value
            }
        });
    }

    handleNext = () => {
        const { activeStep } = this.state;

        switch (activeStep) {
            case 0:
                this.setState({ loading: true });

                const data = {
                    title: this.state.roomData.title,
                    creator_id: this.state.userId,
                    category_id: this.state.roomData.category,
                    description: this.state.roomData.description,
                    cover: "http://excitermag.net/wp-content/uploads/2012/12/24fae0cf4e190078d5b9896e00870cd9.jpg", //TODO
                    permission: this.state.roomData.permission ? 1 : 0,
                    members_limit: this.state.roomData.members_limit_checked ? this.state.roomData.members_limit : 1
                };

                axios.post("/api/room/", data)
                    .then(res => {
                        this.setState({
                            loading: false,
                            roomId: res.data.id,
                            activeStep: activeStep + 1
                        });
                    })
                    .catch(err => {
                        this.setState({ loading: false });
                        console.log(err.response.data.error.errors);
                    });
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
        const { activeStep, addRoomDB } = this.state;

        if (this.state.loading) {
            return (<Spinner className="rooms-page"/>);
        }

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
                                            value={this.state.roomData.category}
                                            name="category"
                                            onChange={event => this.handleUpdateData(event)}
                                            input={<Input name="category" />}
                                            className="add-room-select"
                                        >
                                            <option value="">none</option>
                                            {addRoomDB.categories.map((category) =>
                                                <option value={category.id}>{category.title}</option>
                                            )}
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
                                            {addRoomDB.tags.map((tag) =>
                                                <option value={tag.id}>{tag.title}</option>
                                            )}
                                        </NativeSelect>
                                    </FormControl>

                                    <FormGroup className="add-room-text-field">
                                        <FormControlLabel
                                            label="Private room"
                                            control={
                                                <Switch
                                                    name="permission"
                                                    onChange={event => this.handleUpdateData(event)}
                                                    checked={this.state.roomData.permission}
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
                                                    checked={this.state.roomData.members_limit_checked}
                                                    name="members_limit_checked"
                                                    onChange={event => this.handleUpdateData(event)}
                                                />
                                            }
                                        />

                                        {this.state.roomData.members_limit_checked && <div className="invite-link">
                                            <FormControl  className="textField">
                                                <TextField
                                                    className="add-room-text-field"
                                                    label="Members limit"
                                                    type="number"
                                                    min="1"
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
                                                    checked={this.state.roomData.invite}
                                                    name="invite"
                                                    onChange={event => this.handleUpdateData(event)}
                                                    value="1"
                                                />
                                            }
                                        />

                                        {this.state.roomData.invite && <div className="invite-link">
                                            <FormControl  className="textField">
                                                <TextField
                                                    InputProps={{
                                                        readOnly: true,
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <Link /> &nbsp;{window.location.origin + '/room/' + this.state.roomId}
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
