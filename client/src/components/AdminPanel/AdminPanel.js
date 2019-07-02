import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    FormGroup,
    FormControlLabel, Switch
} from '@material-ui/core';
import Spinner from "../UI/Spinner/Spinner";

class AdminPanel extends React.Component {
    state = {
        events: [],
        rooms: [],
        complaints: [],
        loading: true,
        resolved: false
    };

    componentDidMount() {
        axios.get("/api/admin/list")
            .then(res => {
                console.log("res", res);
                this.setState({
                    events: res.data.events,
                    rooms: res.data.rooms
                });
                return axios.get("/api/admin/complaints");
            })
            .then(res => {
                console.log("complaints", res);
                this.setState({
                    complaints: res.data.complaints,
                    loading: false
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({ loading: false });
            });
    };

    handleUpdateData (event) {

        const data = {
            resolved: this.state.resolved ? 1 : 0,
        };
        axios.put(`/api/admin/${this.state.complaints.entity_type}/${this.state.complaints.entity_id}/complaint/resolved`, data)
            .then( res => {
                this.setState({
                    [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        if (this.state.loading) {
            return (<Spinner className="rooms-page"/>);
        }
        return (
            <div className="admin-panel-conteiner">
                <div className="admin-panel">
                    <Paper className="admin-panel-paper">
                        <Table className="admin-panel-table" size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell className="admin-panel-cell-text">Room/Event name</TableCell>
                                    <TableCell className="admin-panel-cell-text" align="center">id</TableCell>
                                    <TableCell className="admin-panel-cell-text" align="center">banned</TableCell>
                                    <TableCell className="admin-panel-cell-text" align="center">complaint</TableCell>
                                    <TableCell className="admin-panel-cell-text" align="center">resolved</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {((this.state.rooms).concat(this.state.events)).map(entityLists => (
                                    <TableRow key={entityLists.id}>
                                        <TableCell className="admin-panel-cell-text" component="th" scope="row">
                                            <Link to={`/${entityLists.type}/` + entityLists.id} className="admin-panel-cell-text-link">
                                                {entityLists.title}
                                            </Link>
                                        </TableCell>
                                        <TableCell className="admin-panel-cell-text" align="center">{entityLists.id}</TableCell>
                                        <TableCell className="admin-panel-cell-text" align="center">{entityLists.is_banned}</TableCell>
                                        {this.state.complaints.map  ( complaint => (
                                            <TableCell className="admin-panel-cell-text" align="center">
                                                {complaint.text}
                                            </TableCell>
                                            ))}
                                        <TableCell className="admin-panel-cell-text" align="center">
                                            <FormGroup className="add-event-text-field">
                                                <FormControlLabel
                                                    label="resolved"
                                                    control={
                                                        <Switch
                                                            name="resolved"
                                                            onChange={event => this.handleUpdateData(event)}
                                                            checked={this.state.resolved}
                                                        />
                                                    }
                                                />
                                            </FormGroup>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            </div>
        )
    }
}

export default AdminPanel;
