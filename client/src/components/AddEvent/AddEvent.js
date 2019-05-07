import React from 'react';

import axios from 'axios';

import { TextField, Input, FormControlLabel, FormGroup, Button, NativeSelect,
    InputLabel, FormControl, Grid, Stepper, Step, StepLabel, StepContent, Switch, InputAdornment } from '@material-ui/core';
import { CloudUpload, Link } from '@material-ui/icons';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, InlineDateTimePicker } from 'material-ui-pickers';
import Geosuggest from 'react-geosuggest';
import Spinner from "../UI/Spinner/Spinner";

class AddEvent extends React.Component {
    state = {
        activeStep: 0,
        eventId: 1,
        userId: 0,
        roomId: 1,
        loading: true,
        eventData: {
            title: '',
            description: '',
            category: 0,
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
        }
    };

    componentDidMount() {
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
                console.log(err.response.data.error.errors);
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

    handleUpdateLocation = date => {
        this.setState({
            eventData:{
                ...this.state.eventData,
                location: date
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
                    cover: "http://excitermag.net/wp-content/uploads/2012/12/24fae0cf4e190078d5b9896e00870cd9.jpg", //TODO
                    location: "hhh",
                    permission: this.state.eventData.permission ? 1 : 0,
                    start_date: this.state.eventData.start_date.getFullYear() + "."
                        + ("0" + (this.state.eventData.start_date.getMonth() + 1)).slice(-2) +
                        "." + ("0" + (this.state.eventData.start_date.getDate())).slice(-2)
                        + " " + ("0" + (this.state.eventData.start_date.getHours())).slice(-2) +
                        ":" + ("0" + (this.state.eventData.start_date.getMinutes())).slice(-2),
                    members_limit: this.state.eventData.members_limit_checked ? this.state.eventData.members_limit : 1
                };

                axios.post("/api/event/", data)
                    .then(res => {
                        this.setState({
                            loading: false,
                            eventId: res.data.id,
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
                this.props.history.push({ pathname: "/event/" + this.state.eventId });
                break;
            default:
                console.log("Unknown step");
                break;
        }
    };

    render() {
        const { activeStep, addEventDB } = this.state;

        if (this.state.loading) {
            return (<Spinner className="rooms-page"/>);
        }

        return (
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
                                        onChange={event => this.handleUpdateData(event)}
                                        value={this.state.eventData.title}
                                        fullWidth
                                        autoComplete="off"
                                        inputProps={{ maxLength: 100 }}
                                    />

                                    <TextField
                                        required
                                        className="add-event-text-field"
                                        label="Description"
                                        name="description"
                                        onChange={event => this.handleUpdateData(event)}
                                        value={this.state.eventData.description}
                                        fullWidth
                                        multiline
                                        autoComplete="off"
                                        inputProps={{ maxLength: 300 }}
                                    />

                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <InlineDateTimePicker
                                            label="Choose date and time *"
                                            ampm={false}
                                            //name="start_date"
                                            value={this.state.eventData.start_date}
                                            onChange={this.handleUpdateStartDate}
                                            className="add-event-picker"
                                            format="yyyy.MM.dd HH:mm"
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
                                                    value={this.state.eventData.location}
                                                    onChange={this.handleUpdateLocation}
                                                />
                                            }
                                        />
                                    </FormGroup>

                                    <FormControl className="formControl">
                                        <InputLabel shrink htmlFor="age-native-label-placeholder">
                                            Category
                                        </InputLabel>
                                        <NativeSelect
                                            value={this.state.eventData.category}
                                            name="category"
                                            onChange={event => this.handleUpdateData(event)}
                                            input={<Input name="category" />}
                                            className="add-event-select"
                                        >
                                            <option value="">none</option>
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
                                <div>
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

                                    <Grid container spacing={24}>
                                        <Grid item md={12}>
                                            <Button variant="contained" className="add-event-button-upload">
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
        );
    }
}

export default AddEvent;
