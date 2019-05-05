import React from 'react';

import { TextField, Input, FormControlLabel, FormGroup, Button, NativeSelect,
    InputLabel, FormControl, Grid, Stepper, Step, StepLabel, StepContent} from '@material-ui/core';
import { CloudUpload} from '@material-ui/icons';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, InlineDateTimePicker } from 'material-ui-pickers';
import Geosuggest from 'react-geosuggest';

class AddEvent extends React.Component {
    state = {
        activeStep: 0,
        eventData: {
            title: '',
            description: '',
            location: '',
            category: 0,
            tags: 0,
            start_date: new Date(),
            members_limit: '',
        },
        eventId: 1,
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
                //ToDo Create event
                console.log(this.state);
                break;
            case 1:
                //ToDo upload cover
                this.props.history.push({ pathname: "/event/" + this.state.eventId });
                break;
            default:
                console.log("Unknown step");
                break;
        }
    };

    render() {
        const { activeStep  } = this.state;

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
                                            label="Choose date and time"
                                            ampm={false}
                                            value={this.state.eventData.start_date}
                                            onChange={this.handleUpdateStartDate}
                                            className="add-event-picker"
                                        />
                                    </MuiPickersUtilsProvider>

                                    <FormGroup className="add-event-location">
                                        <FormControlLabel
                                            labelPlacement="top"
                                            label="Location"
                                            value={this.state.eventData.location}
                                            onChange={this.handleUpdateLocation}
                                            control={
                                                <Geosuggest />
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
                                            <option value={10}>sport</option>
                                            <option value={20}>music</option>
                                            <option value={30}>education</option>
                                            <option value={40}>films</option>
                                        </NativeSelect>
                                    </FormControl>

                                    <TextField
                                        className="add-event-text-field"
                                        label="Members limit"
                                        name="members_limit"
                                        onChange={event => this.handleUpdateData(event)}
                                        value={this.state.eventData.members_limit}
                                        fullWidth
                                        autoComplete="off"
                                    />

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
                                            <option value={10}>sport</option>
                                            <option value={20}>music</option>
                                            <option value={30}>education</option>
                                            <option value={40}>films</option>
                                        </NativeSelect>
                                    </FormControl>
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
