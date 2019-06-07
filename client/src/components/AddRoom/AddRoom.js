import React from 'react';

import axios from 'axios';

import { TextField, Input, FormControlLabel, Switch, FormGroup, Button, NativeSelect, Paper,
    InputLabel, FormControl, InputAdornment, Grid, Stepper, Step, StepLabel, StepContent } from '@material-ui/core';
import { CloudUpload, Link } from '@material-ui/icons';
import Spinner from "../UI/Spinner/Spinner";
import {withSnackbar} from "notistack";
import ImageUploader from "./../ImageUploader/ImageUploader";

const messageType = {
    SUCCESS: "success",
    INFO: "info",
    ERR: "error"
};

class AddRoom extends React.Component {
    state = {
        activeStep: 0,
        roomId: 0,
        userId: 0,
        loading: true,
        tagId: 0,
        roomData: {
            title: '',
            description: '',
            category: 5,
            tags: 0,
            permission: false,
            invite: false,
            members_limit: 1,
            members_limit_checked: false,
        },
        addRoomDB: {
            categories: [],
            tags: [],
        },
        errors: {
            title: false,
            description: false,
            category: false,
            tags: false,
            members_limit: false,
            permission: false
        },
        showUpload: false,
        imageSRC: null,
        authUser: false
    };

    showToast = (message, variant) => {
        this.props.enqueueSnackbar(message, {
            variant: variant ? variant : 'default',
        });
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
                    description: this.state.roomData.description,
                    creator_id: this.state.userId,
                    category_id: this.state.roomData.category,
                    cover: this.state.imageSRC || this.state.roomData.cover,
                    permission: this.state.roomData.permission ? 1 : 0,
                    members_limit: this.state.roomData.members_limit_checked ? this.state.roomData.members_limit : null
                };

                axios.post("/api/room/", data)
                    .then(res => {
                        this.setState({
                            loading: false,
                            roomId: res.data.id,
                            authUser :!this.state.authUser,
                            activeStep: activeStep + 1
                        });
                    })
                    .catch(err => {
                        let errors = err.response.data.error.errors;
                        for (const key  in errors) {
                            this.showToast(errors[key][0], messageType.ERR);
                            errors[key] = true;
                        }
                        this.setState({ loading: false, errors: errors });
                    });
                break;
            case 1:
                const updatedData = {
                    cover: this.state.imageSRC,
                    description: this.state.roomData.description,
                    title: this.state.roomData.title
                };
                axios.put("/api/room/" + this.state.roomId, updatedData)
                    .then(res => {
                        this.props.history.push({ pathname: "/room/" + this.state.roomId });
                        this.showToast("Congratulations! Room created!", messageType.SUCCESS);
                    })
                    .catch(err => {
                        let errors = err.response.data.error.errors;
                        for (const key  in errors) {
                            this.showToast(errors[key][0], messageType.ERR);
                            errors[key] = true;
                        }
                        this.setState({ loading: false, errors: errors });
                    });
                break;
            default:
                console.log("Unknown step");
                break;
        }
    };

    showUploadComponent = () => {
        this.setState({showUpload: true})
    }

    closeUploadComponent = () => {
        this.setState({showUpload: false})
    }

    getImagesSRC = (imageSRC) => {
        this.setState({imageSRC});
    }

    render() {
        const { activeStep, addRoomDB, roomId } = this.state;
        const { isAuthenticated } = this.props;

        if (this.state.loading) {
            return (<Spinner className="rooms-page"/>);
        }

        return (
            <>
                <ImageUploader 
                    show={this.state.showUpload}
                    closeUploadComponent={this.closeUploadComponent}
                    uploaderType="cover"
                    entityURL={this.props.match.url}
                    authUser={this.state.authUser}
                    isAuthenticated={isAuthenticated}
                    getImagesSRC={this.getImagesSRC}
                />
                <div className="add-room-page">
                    <form className="add-room-page-container">
                        <label className="add-room-header">Please fill in all fields to create room</label>
                        <Stepper activeStep={activeStep} orientation="vertical" className="add-room-stepper">
                            <Step key={0}>
                                <StepLabel>Room info</StepLabel>
                                <StepContent>
                                    <div>
                                        <TextField
                                            required
                                            className="add-room-text-field"
                                            label="Title"
                                            name="title"
                                            placeholder="Min 3 symbols, Max 100 symbols"
                                            onChange={event => this.handleUpdateData(event)}
                                            value={this.state.roomData.title}
                                            fullWidth
                                            autoComplete="off"
                                            inputProps={{ maxLength: 100 }}
                                            error={this.state.errors.title}
                                        />

                                        <TextField
                                            required
                                            className="add-room-text-field"
                                            label="Description"
                                            name="description"
                                            placeholder="Min 6 symbols, Max 300 symbols"
                                            onChange={event => this.handleUpdateData(event)}
                                            value={this.state.roomData.description}
                                            fullWidth
                                            multiline
                                            autoComplete="off"
                                            inputProps={{ maxLength: 300 }}
                                            error={this.state.errors.description}
                                        />

                                        <FormControl required className="formControl">
                                            <InputLabel shrink htmlFor="age-native-label-placeholder">
                                                Category
                                            </InputLabel>
                                            <NativeSelect
                                                value={this.state.roomData.category}
                                                name="category"
                                                onChange={event => this.handleUpdateData(event)}
                                                input={<Input name="category" />}
                                                className="add-room-select"
                                                error={this.state.errors.category}
                                            >
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
                                                error={this.state.errors.tags}
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
                                                        error={this.state.errors.permission}
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
                                                <FormControl className="textField">
                                                    <TextField
                                                        className="add-room-text-field"
                                                        label="Members limit"
                                                        type="number"
                                                        min="1"
                                                        name="members_limit"
                                                        onChange={event => this.handleUpdateData(event)}
                                                        value={this.state.roomData.members_limit}
                                                        fullWidth
                                                        autoComplete="off"
                                                        error={this.state.errors.members_limit}
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
                                        <Paper elevation={1} className="created-room-info">
                                            <InputLabel className="created-room-info-label-info">Room information</InputLabel>
                                            <InputLabel className="created-room-info-label">
                                                Title:&nbsp;{this.state.roomData.title}
                                            </InputLabel>
                                            <InputLabel className="created-room-info-label">
                                                Description:&nbsp;{this.state.roomData.description}
                                            </InputLabel>
                                            <InputLabel className="created-room-info-label">
                                                Category:&nbsp;
                                                {addRoomDB.categories.map((category) =>
                                                    (category.id === this.state.roomData.category) ? (category.title) : null
                                                )}
                                            </InputLabel>
                                            <InputLabel className="created-room-info-label">
                                                Tags:&nbsp;
                                                {addRoomDB.tags.map((tag) =>
                                                    (tag.id === this.state.roomData.tags) ? (tag.title) : null
                                                )}
                                            </InputLabel>
                                            <InputLabel className="created-room-info-label">
                                                Permission:&nbsp;{this.state.roomData.permission ? "Private room" : "Open room"}
                                            </InputLabel>
                                            <InputLabel className="created-room-info-label">
                                                Members limit:&nbsp;{this.state.roomData.members_limit_checked ? this.state.roomData.members_limit : "-"}
                                            </InputLabel>
                                        </Paper>

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
                                                <Button variant="contained" className="add-room-button-upload" onClick={this.showUploadComponent}>
                                                    <CloudUpload />&nbsp;&nbsp;
                                                    <span >Upload cover</span>
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
            </>
        );
    }
}

export default withSnackbar(AddRoom);
