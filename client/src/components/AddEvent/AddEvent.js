import React from 'react';

import { TextField, Input, FormControlLabel, FormGroup, Button, NativeSelect,
    InputLabel, FormControl, Grid } from '@material-ui/core';
import { CloudUpload} from '@material-ui/icons';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, InlineDateTimePicker } from 'material-ui-pickers';
import Geosuggest from 'react-geosuggest';

class AddEvent extends React.Component {
    state = {
        available: true,
        invite: false,
        category: '',
        selectedDate: new Date(),
    };

    handleDateChange = date => {
        this.setState({ selectedDate: date });
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    render() {
        const { selectedDate } = this.state;

        return (
            <div className="add-event-page">
                <form className="add-event-page-container">
                    <label className="add-event-header">Please fill in all fields to create event</label>
                    <TextField
                        required
                        className="add-event-text-field"
                        label="Title"
                        fullWidth
                        autoComplete="off"
                        inputProps={{ maxLength: 70 }}
                    />

                    <TextField
                        required
                        className="add-event-text-field"
                        label="Description"
                        fullWidth
                        multiline
                        autoComplete="off"
                        inputProps={{ maxLength: 200 }}
                    />

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <InlineDateTimePicker
                            label="Choose date and time"
                            ampm={false}
                            value={selectedDate}
                            onChange={this.handleDateChange}
                            className="add-event-picker"
                        />
                    </MuiPickersUtilsProvider>

                    <FormGroup className="add-event-location">
                        <FormControlLabel
                            labelPlacement="top"
                            label="Location"
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
                            value={this.state.category}
                            onChange={this.handleChange('category')}
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
                        label="Tags"
                        fullWidth
                        autoComplete="off"
                    />

                    <TextField
                        className="add-event-text-field"
                        label="Members limit"
                        fullWidth
                        //variant="filled"
                        autoComplete="off"
                    />

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
                        <Grid item md={12} className="add-event-create-button">
                            <Button variant="contained" className="add-event-button">Create event</Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        );
    }
}

export default AddEvent;
