import React from 'react';

import axios from 'axios';

import { TextField, Input, FormControlLabel, FormGroup, Button, NativeSelect, Paper,
    InputLabel, FormControl, Stepper, Step, StepLabel, StepContent, Switch, InputAdornment } from '@material-ui/core';
import { CloudUpload, Link } from '@material-ui/icons';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, InlineDateTimePicker } from 'material-ui-pickers';
import Geosuggest from 'react-geosuggest';
import Spinner from "../UI/Spinner/Spinner";
import {withSnackbar} from "notistack";
import ImageUploader from "./../ImageUploader/ImageUploader";

const messageType = {
    SUCCESS: "success",
    INFO: "info",
    ERR: "error"
};

class AddEvent extends React.Component {
    state = {
        activeStep: 0,
        eventId: 1,
        userId: 0,
        roomId: null,
        loading: true,
        tagId: 0,
        eventData: {
            title: '',
            description: '',
            category: 5,
            tags: 0,
            permission: false,
            invite: false,
            members_limit: 1,
            members_limit_checked: false,
            location: '',
            start_date: new Date(),
        },
        addEventDB: {
            categories: [],
            tags: [],
        },
        errors: {
            title: false,
            description: false,
            start_date: false,
            location: false,
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
        const { id } = this.props.match.params;
        if (id) {
            this.setState({roomId: id});
        }

        axios.get("/api/category")
            .then(res => {
                this.setState({
                    addEventDB:{
                        ...this.state.addEventDB,
                        categories: res.data
                    }
                });

                return axios.get("/api/tag");
            })
            .then(res => {
                this.setState({
                    addEventDB: {
                        ...this.state.addEventDB,
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

                return axios.get('/api/room/' + this.state.roomId);
            })
            .then(res => {
                this.setState({
                    loading: false,
                    roomId: res.data.id
                });
            })
            .catch(err => {
                this.setState({ loading: false });
            });
    };

    handleUpdateStartDate = date => {
        this.setState({
            eventData:{
                ...this.state.eventData,
                start_date: date
            }
        });
    };

    handleGeosuggestChange = location => {
        if ( !location ) {
            return;
        }
        this.setState({
            eventData:{
                ...this.state.eventData,
                location: location.label
            }
        });
    };

    handleUpdateData (event) {
        this.setState({
            eventData:{
                ...this.state.eventData,
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
                    title: this.state.eventData.title,
                    creator_id: this.state.userId,
                    category_id: this.state.eventData.category,
                    room_id:  this.state.roomId,
                    description: this.state.eventData.description,
                    cover: this.state.imageSRC || this.state.eventData.cover,
                    location:  this.state.eventData.location,
                    permission: this.state.eventData.permission ? 1 : 0,
                    start_date: this.state.eventData.start_date.getFullYear() + "."
                        + ("0" + (this.state.eventData.start_date.getMonth() + 1)).slice(-2) +
                        "." + ("0" + (this.state.eventData.start_date.getDate())).slice(-2)
                        + " " + ("0" + (this.state.eventData.start_date.getHours())).slice(-2) +
                        ":" + ("0" + (this.state.eventData.start_date.getMinutes())).slice(-2),
                    members_limit: this.state.eventData.members_limit_checked ? this.state.eventData.members_limit : null
                };

                axios.post("/api/event/", data)
                    .then(res => {
                        this.setState({
                            loading: false,
                            eventId: res.data.id,
                            authUser :!this.state.authUser,
                            activeStep: activeStep + 1
                        });
                    })
                    .catch(err => {
                        let errors = err.response.data.error ? err.response.data.error.errors : [];
                        for (const key in errors) {
                            this.showToast(errors[key][0], messageType.ERR);
                            errors[key] = true;
                        }
                        this.setState({ loading: false, errors: errors });
                    });
                break;
            case 1:
                const updatedData = {
                    cover: this.state.imageSRC
                };
                axios.put("/api/event/" + this.state.eventId, updatedData)
                    .then(res => {
                        this.props.history.push({ pathname: "/event/" + this.state.eventId });
                        this.showToast("Congratulations! Event created!",messageType.SUCCESS);
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
    };

    closeUploadComponent = () => {
        this.setState({showUpload: false})
    };

    getImagesSRC = (imageSRC) => {
        this.setState({imageSRC});
    };

    render() {
        const { activeStep, addEventDB } = this.state;
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
                <div className="add-event-page">
                    <form className="add-event-page-container">
                        <label className="add-event-header">Please fill in all fields to create event</label>
                        <Stepper activeStep={activeStep} orientation="vertical" className="add-event-stepper">
                            <Step key={0}>
                                <StepLabel>Event info</StepLabel>
                                <StepContent>
                                    <div>
                                        <TextField
                                            required
                                            className="add-event-text-field"
                                            label="Title"
                                            name="title"
                                            placeholder="Min 3 symbols, Max 100 symbols"
                                            onChange={event => this.handleUpdateData(event)}
                                            value={this.state.eventData.title}
                                            fullWidth
                                            autoComplete="off"
                                            inputProps={{ maxLength: 100 }}
                                            error={this.state.errors.title}
                                        />

                                        <TextField
                                            required
                                            className="add-event-text-field"
                                            label="Description"
                                            name="description"
                                            placeholder="Min 6 symbols, Max 300 symbols"
                                            onChange={event => this.handleUpdateData(event)}
                                            value={this.state.eventData.description}
                                            fullWidth
                                            multiline
                                            autoComplete="off"
                                            inputProps={{ maxLength: 300 }}
                                            error={this.state.errors.description}
                                        />

                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <InlineDateTimePicker
                                                label="Choose date and time *"
                                                ampm={false}
                                                value={this.state.eventData.start_date}
                                                onChange={this.handleUpdateStartDate}
                                                className="add-event-picker"
                                                format="yyyy.MM.dd HH:mm"
                                                error={this.state.errors.start_date}
                                            />
                                        </MuiPickersUtilsProvider>

                                        <FormGroup className="add-event-location">
                                            <FormControlLabel
                                                labelPlacement="top"
                                                label="Location *"
                                                control={
                                                    <Geosuggest
                                                        name="location"
                                                        onActivateFirstSuggest="true"
                                                        initialValue={this.state.eventData.location}
                                                        onSuggestSelect={this.handleGeosuggestChange}
                                                        autoActivateFirstSuggest={true}
                                                        error={this.state.errors.location}
                                                        autoComplete="off"
                                                    />
                                                }
                                            />
                                        </FormGroup>

                                        <FormControl required className="formControl">
                                            <InputLabel shrink htmlFor="uncontrolled-native">
                                                Category
                                            </InputLabel>
                                            <NativeSelect
                                                value={this.state.eventData.category}
                                                name="category"
                                                onChange={event => this.handleUpdateData(event)}
                                                input={<Input name="category" />}
                                                className="add-event-select"
                                                error={this.state.errors.category}
                                            >
                                                {addEventDB.categories.map((category) =>
                                                    <option value={category.id}>{category.title}</option>
                                                )}
                                            </NativeSelect>
                                        </FormControl>

                                        <FormControl className="formControl">
                                            <InputLabel shrink htmlFor="age-native-label-placeholder">
                                                Tags
                                            </InputLabel>
                                            <NativeSelect
                                                value={this.state.eventData.tags}
                                                name="tags"
                                                onChange={event => this.handleUpdateData(event)}
                                                input={<Input name="tags" />}
                                                className="add-event-select"
                                                error={this.state.errors.tags}
                                            >
                                                <option value="">none</option>
                                                {addEventDB.tags.map((tag) =>
                                                    <option value={tag.id}>{tag.title}</option>
                                                )}
                                            </NativeSelect>
                                        </FormControl>

                                        <FormGroup className="add-event-text-field">
                                            <FormControlLabel
                                                label="Private event"
                                                control={
                                                    <Switch
                                                        name="permission"
                                                        onChange={event => this.handleUpdateData(event)}
                                                        checked={this.state.eventData.permission}
                                                        error={this.state.errors.permission}
                                                    />
                                                }
                                            />
                                        </FormGroup>

                                        <FormGroup className="add-event-invite-members">
                                            <FormControlLabel
                                                className="invite-members"
                                                label="Members limits"
                                                control={
                                                    <Switch
                                                        checked={this.state.eventData.members_limit_checked}
                                                        name="members_limit_checked"
                                                        onChange={event => this.handleUpdateData(event)}
                                                    />
                                                }
                                            />

                                            {this.state.eventData.members_limit_checked && <div className="invite-link">
                                                <FormControl  className="textField">
                                                    <TextField
                                                        className="add-event-text-field"
                                                        label="Members limit"
                                                        type="number"
                                                        min="1"
                                                        name="members_limit"
                                                        onChange={event => this.handleUpdateData(event)}
                                                        value={this.state.eventData.members_limit}
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
                                            className="add-event-button-create"
                                        >
                                            Save and upload cover
                                        </Button>
                                    </div>
                                </StepContent>
                            </Step>
                            <Step key={1}>
                                <StepLabel>Upload cover</StepLabel>
                                <StepContent>
                                    <Paper elevation={1} className="created-event-info">
                                        <InputLabel className="created-event-info-label-info">Event information</InputLabel>
                                        <InputLabel className="created-event-info-label">
                                            Title:&nbsp;{this.state.eventData.title}
                                        </InputLabel>
                                        <InputLabel className="created-event-info-label">
                                            Description:&nbsp;{this.state.eventData.description}
                                        </InputLabel>
                                        <InputLabel className="created-event-info-label">
                                            Date and time:&nbsp;{this.state.eventData.start_date.getFullYear() + "."
                                            + ("0" + (this.state.eventData.start_date.getMonth() + 1)).slice(-2) +
                                            "." + ("0" + (this.state.eventData.start_date.getDate())).slice(-2)
                                            + ", " + ("0" + (this.state.eventData.start_date.getHours())).slice(-2) +
                                            ":" + ("0" + (this.state.eventData.start_date.getMinutes())).slice(-2)}
                                        </InputLabel>
                                        <InputLabel className="created-event-info-label">
                                            Location:&nbsp;{this.state.eventData.location}
                                        </InputLabel>
                                        <InputLabel className="created-event-info-label">
                                            Category:&nbsp;
                                            {addEventDB.categories.map((category) =>
                                                (category.id === this.state.eventData.category) ? (category.title) : null
                                            )}
                                        </InputLabel>
                                        <InputLabel className="created-event-info-label">
                                            Tags:&nbsp;
                                            {addEventDB.tags.map((tag) =>
                                                (tag.id === this.state.eventData.tags) ? (tag.title) : null
                                            )}
                                        </InputLabel>
                                        <InputLabel className="created-event-info-label">
                                            Permission:&nbsp;{this.state.eventData.permission ? "Private event" : "Open event"}
                                        </InputLabel>
                                        <InputLabel className="created-event-info-label">
                                            Members limit:&nbsp;{this.state.eventData.members_limit_checked ? this.state.eventData.members_limit : "-"}
                                        </InputLabel>
                                    </Paper>
                                    <FormGroup className="add-event-invite-members">
                                        <FormControlLabel
                                            className="invite-members"
                                            label="Invite members"
                                            control={
                                                <Switch
                                                    checked={this.state.eventData.invite}
                                                    name="invite"
                                                    onChange={event => this.handleUpdateData(event)}
                                                    value="1"
                                                />
                                            }
                                        />
                                        {this.state.eventData.invite && <div className="invite-link">
                                            <FormControl className="textField">
                                                <TextField
                                                    InputProps={{
                                                        readOnly: true,
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <Link /> &nbsp;{window.location.origin + '/event/' + this.state.eventId}
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </FormControl>
                                        </div>}
                                    </FormGroup>
                                    <Button variant="contained" className="add-event-button-upload" onClick={this.showUploadComponent}>
                                        <CloudUpload />&nbsp;&nbsp;
                                        <span>Upload cover</span>
                                    </Button>
                                    <div>
                                        <Button
                                            variant="contained"
                                            onClick={this.handleNext}
                                            className="add-event-button-update-cover"
                                        >
                                            Create event
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

export default withSnackbar(AddEvent);
