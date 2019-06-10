import React from 'react';
import axios from "axios";

import { Button, FormControl, FormControlLabel, FormGroup, Grid, Input, NativeSelect, Switch,
    TextField, Typography } from "@material-ui/core";
import Spinner from "../UI/Spinner/Spinner";
import ImageUploader from "./../ImageUploader/ImageUploader";
import {withSnackbar} from "notistack";

const messageType = {
    SUCCESS: "success",
    INFO: "info",
    ERR: "error"
};

class EditRoom extends React.Component {
    state = {
        roomEditDB: null,
        categories: [],
        loading: true,
        showUpload: false,
        imageSRC: null,
        errors: {
            title: false,
            description: false,
            members_limit: false,
        }
    };

    showToast = (message, variant) => {
        this.props.enqueueSnackbar(message, {
            variant: variant ? variant : 'default',
        });
    };

    componentDidMount() {
        const { id } = this.props.match.params;

        axios.get("/api/category")
            .then(res => {
                this.setState({
                    categories: res.data
                });

               return axios.get("/api/room/" + id)
            })
            .then(res => {
                this.setState({
                    loading: false,
                    roomEditDB: res.data
                });
            })
            .catch(err => {
                this.setState({ loading: false });
            });
    };

    handleUpdateData (event) {
        this.setState({
            roomEditDB:{
                ...this.state.roomEditDB,
                [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value
            }
        });
    }

    handleSave = () => {
        this.setState({ loading: true });
        const { id } = this.props.match.params;

        const data = {
            title: this.state.roomEditDB.title,
            description: this.state.roomEditDB.description,
            cover: this.state.imageSRC || this.state.roomEditDB.cover,
            permission: this.state.roomEditDB.permission ? 1 : 0,
            members_limit: this.state.roomEditDB.members_limit_checked ? this.state.roomEditDB.members_limit : null,
            category_id: this.state.roomEditDB.category_id
        };

        axios.put("/api/room/" + id, data)
            .then(res => {
                this.setState({
                    loading: false,
                    id: res.data.id
                });
                this.props.history.push({ pathname: "/room/" + id});
                this.showToast("Changes saved!", messageType.SUCCESS);
            })
            .catch(err => {
                let errors = err.response.data.error ? err.response.data.error.errors : [];
                for (const key in errors) {
                    this.showToast(errors[key][0], messageType.ERR);
                    errors[key] = true;
                }
                this.setState({
                    loading: false,
                    errors: errors
                });
            });
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
        const { roomEditDB, categories } = this.state;
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
                    authUser={true}
                    isAuthenticated={isAuthenticated}
                    getImagesSRC={this.getImagesSRC}
                />
                <div className="edit-room-page">
                    <form className="edit-room-page-content">
                        <div className="edit-room-page-text-block">
                            <Typography variant="h4" className="edit-room-page-typography">
                                Edit room title:
                            </Typography>
                            <div className="edit-room-page-text-field">
                                <TextField
                                    className="edit-room-page-text-field"
                                    margin="normal"
                                    name="title"
                                    variant="filled"
                                    min="3"
                                    inputProps={{ maxLength: 100 }}
                                    autoComplete="off"
                                    fullWidth
                                    multiline
                                    value={roomEditDB.title}
                                    onChange={event => this.handleUpdateData(event)}
                                    error={this.state.errors.title}
                                />
                            </div>
                        </div>

                        <div className="edit-room-page-text-block">
                            <Typography variant="h4" className="edit-room-page-typography">
                                Edit room description:
                            </Typography>
                            <div className="edit-room-page-text-field">
                                <TextField
                                    className="edit-room-page-text-field"
                                    margin="normal"
                                    variant="filled"
                                    name="description"
                                    min="6"
                                    inputProps={{ maxLength: 300 }}
                                    autoComplete="off"
                                    fullWidth
                                    multiline
                                    value={roomEditDB.description}
                                    onChange={event => this.handleUpdateData(event)}
                                    error={this.state.errors.description}
                                />
                            </div>
                        </div>

                        <div className="edit-room-page-text-block">
                            <Typography variant="h4" className="edit-room-page-typography">
                                Edit room permission:
                            </Typography>
                            <FormGroup>
                                <FormControlLabel
                                    className="new"
                                    label="Private room"
                                    control={
                                        <Switch
                                            name="permission"
                                            onChange={event => this.handleUpdateData(event)}
                                            checked={this.state.roomEditDB.permission}
                                        />
                                    }
                                />
                            </FormGroup>
                        </div>

                        <div className="edit-room-page-text-block">
                            <Typography variant="h4" className="edit-room-page-typography">
                                Edit member limit:
                            </Typography>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={this.state.roomEditDB.members_limit_checked}
                                            name="members_limit_checked"
                                            onChange={event => this.handleUpdateData(event)}
                                        />
                                    }
                                />

                                {this.state.roomEditDB.members_limit_checked && <div>
                                    <FormControl className="textField">
                                        <TextField
                                            type="number"
                                            min="1"
                                            name="members_limit"
                                            onChange={event => this.handleUpdateData(event)}
                                            value={this.state.roomEditDB.members_limit || "1"}
                                            fullWidth
                                            autoComplete="off"
                                            error={this.state.errors.members_limit}
                                        />
                                    </FormControl>
                                </div>}
                            </FormGroup>
                        </div>

                        <div className="edit-room-page-text-block">
                            <Typography variant="h4" className="edit-room-page-typography">
                                Edit category:
                            </Typography>
                            <FormControl className="formControl">
                                <NativeSelect
                                    value={this.state.roomEditDB.category_id}
                                    name="category_id"
                                    onChange={event => this.handleUpdateData(event)}
                                    input={<Input name="category_id" />}
                                    className="edit-room-select"
                                >
                                    {categories.map((category) =>
                                        <option value={category.id} selected={category.id === roomEditDB.category_id}>{category.title}</option>
                                    )}
                                </NativeSelect>
                            </FormControl>
                        </div>

                        <div className="edit-room-page-text-block">
                            <Grid container>
                                <Grid item lg={4}>
                                    <Typography variant="h4" className="edit-room-page-typography">
                                        Edit room cover:
                                    </Typography>
                                    <div className="edit-room-page-text-field">
                                        <Button variant="contained" className="edit-room-page-button-upload"
                                                onClick={this.showUploadComponent}
                                        >
                                            <span>Choose</span>
                                        </Button>
                                    </div>
                                </Grid>
                                <Grid item lg={8} className="edit-room-page-current-cover-grid">
                                    <img className="edit-room-page-current-cover" src={this.state.imageSRC || this.state.roomEditDB.cover} alt={"room-cover"}/>
                                </Grid>
                            </Grid>
                        </div>
                           <Button
                                className="edit-room-page-save-btn"
                                variant="outlined"
                                onClick={this.handleSave}
                           >
                               Save changes
                           </Button>
                    </form>
                </div>
            </>
        );
    }
}

export default withSnackbar(EditRoom);
