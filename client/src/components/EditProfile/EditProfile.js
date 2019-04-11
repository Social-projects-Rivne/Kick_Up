import React, { Component } from "react";

import { 
    Typography, 
    Grid, 
    Paper,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemAvatar,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Avatar,
    Fab
} from '@material-ui/core';

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
        //this.componentDidMount = this.componentDidMount.bind(this);
    }
    render() {
        return (
            <div className="edit-profile">
                <h1>Here will go edit profile</h1>
            </div>
        )
    }
}

export default EditProfile;