import React from 'react';

import { TextField, Input, FormControlLabel, Switch, FormGroup, Button, NativeSelect,
    InputLabel, FormControl, InputAdornment, Grid } from '@material-ui/core';
import { CloudUpload, Link } from '@material-ui/icons';

class AddRoom extends React.Component {
    state = {
        available: true,
        invite: false,
        category: '',
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    render() {
        return (
            <div className="add-room-page">
                <form className="add-room-page-container">
                    <label className="add-room-header">Please fill in all fields to create room</label>
                    <TextField
                        required
                        className="add-room-text-field"
                        label="Title"
                        fullWidth
                        autoComplete="off"
                        inputProps={{ maxLength: 70 }}
                    />

                    <TextField
                        required
                        className="add-room-text-field"
                        label="Description"
                        fullWidth
                        multiline
                        autoComplete="off"
                        inputProps={{ maxLength: 200 }}
                    />

                    <TextField
                        className="add-room-text-field"
                        label="Tags"
                        fullWidth
                        autoComplete="off"
                    />

                    <TextField
                        className="add-room-text-field"
                        label="Members limit"
                        fullWidth
                        //variant="filled"
                        autoComplete="off"
                    />

                    <FormControl className="formControl">
                        <InputLabel shrink htmlFor="age-native-label-placeholder">
                            Category
                        </InputLabel>
                        <NativeSelect
                            value={this.state.category}
                            onChange={this.handleChange('category')}
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

                    <FormGroup className="cher">
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
                        <Grid item md={12} className="add-room-create-button">
                            <Button variant="contained" className="add-room-button">Create room</Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        );
    }
}

export default AddRoom;
