import React from 'react';

import { TextField, FormControl, FormLabel, FormControlLabel, Switch, FormGroup, Button } from '@material-ui/core';

class AddRoom extends React.Component {
    state = {
        available: true,
        invite: false,
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    render() {
        return (
            <form className="add-room-page">
                <label className="add-room-header">Please fill in all fields</label>
                <TextField
                    className="add-room-text-field"
                    label="Room name"
                    id="mui-theme-provider-standard-input"
                    fullWidth

                    autoComplete="off"
                />

                <TextField
                    className="add-room-text-field"
                    label="Description"
                    id="mui-theme-provider-standard-input"
                    fullWidth

                    autoComplete="off"
                />

                <input type="file" />

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

                <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.state.jason}
                                onChange={this.handleChange('invite')}
                                value="invite"
                            />
                        }
                        label="Invite members"
                    />
                </FormGroup>

                <TextField
                    className="add-room-text-field"
                    label="Tags"
                    id="mui-theme-provider-standard-input"
                    fullWidth
                    variant="filled"
                    autoComplete="off"
                />

                <Button  variant="outlined" color="inherit">Create room</Button>
            </form>
        );
    }
}

export default AddRoom;