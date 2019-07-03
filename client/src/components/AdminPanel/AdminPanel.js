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
        loading: true
    };

    componentDidMount() {
        axios.get("/api/admin/list")
            .then(res => {
                this.setState({
                    events: res.data.events,
                    rooms: res.data.rooms
                });
                return axios.get("/api/admin/complaints");
            })
            .then(res => {
                const r = ((this.state.rooms).concat(this.state.events)).map(entityLists => {
                    let compl = null;
                    res.data.complaints.forEach(complaint => {
                        if (complaint.entity_id === entityLists.id && complaint.entity_type === entityLists.type) {
                            compl = complaint;
                        }
                    });
                    entityLists.complaint = compl;
                    return entityLists;
                });

                this.setState({
                    complaints: r,
                    loading: false
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({ loading: false });
            });
    };

    handleUpdateData (event) {
        let userId = 0;
        const info = event.target.name.split("-");
        let compls = this.state.complaints.map(elem => {
            if(elem.complaint && elem.complaint.entity_id == info[1] && elem.complaint.entity_type == info[2] ) {
                elem.complaint.resolved = event.target.checked ? 1 : 0;
                userId = elem.complaint.creator.id;
            }
            return elem;
        });
        this.setState({
            complaints: compls
        });
        axios.put(`/api/admin/${info[2]}/${info[1]}/complaint/resolved`, {
            resolved: event.target.checked ? 1 : 0,
            user_id: userId
        })
            .then( () => {
                console.log("ok");
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
                                {this.state.complaints.map(entityLists => (
                                    <TableRow key={entityLists.id}>
                                        <TableCell className="admin-panel-cell-text" component="th" scope="row">
                                            <Link to={`/${entityLists.type}/` + entityLists.id} className="admin-panel-cell-text-link">
                                                {entityLists.title}
                                            </Link>
                                        </TableCell>
                                        <TableCell className="admin-panel-cell-text" align="center">{entityLists.id}</TableCell>
                                        <TableCell className="admin-panel-cell-text" align="center">{entityLists.is_banned}</TableCell>

                                        {((entityLists.complaint !== null) ?
                                            <TableCell className="admin-panel-cell-text" align="center">
                                                {entityLists.complaint.text}
                                            </TableCell>
                                                :
                                            <TableCell className="admin-panel-cell-text" align="center">
                                            </TableCell>
                                        )}

                                        {((entityLists.complaint !== null) ?
                                            <TableCell className="admin-panel-cell-text" align="center">
                                                <FormGroup className="add-event-text-field">
                                                    <FormControlLabel
                                                        label="resolved"
                                                        control={
                                                            <Switch
                                                                name={`resolved-${entityLists.id}-${entityLists.complaint.entity_type}`}
                                                                onChange={event => this.handleUpdateData(event)}
                                                                checked={entityLists.complaint.resolved}
                                                            />
                                                        }
                                                    />
                                                </FormGroup>
                                            </TableCell>
                                            :
                                            <TableCell className="admin-panel-cell-text" align="center">
                                            </TableCell>
                                        )}
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
