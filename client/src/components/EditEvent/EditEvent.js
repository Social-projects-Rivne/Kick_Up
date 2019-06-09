import React from 'react';
import axios from "axios";

import { Button, FormControl, FormControlLabel, FormGroup, Grid, Input, NativeSelect, Switch,
    TextField, Typography } from "@material-ui/core";
import Spinner from "../UI/Spinner/Spinner";
import ImageUploader from "./../ImageUploader/ImageUploader";
import {withSnackbar} from "notistack";
import {InlineDateTimePicker, MuiPickersUtilsProvider} from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import Geosuggest from "react-geosuggest";

const messageType = {
    SUCCESS: "success",
    INFO: "info",
    ERR: "error"
};

class EditEvent extends React.Component {
    state = {
        eventEditDB: null,
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

                return axios.get("/api/event/" + id)
            })
            .then(res => {
                this.setState({
                    loading: false,
                    eventEditDB: res.data
                });
            })
            .catch(err => {
                this.setState({ loading: false });
            });
    };

    handleUpdateData (event) {
        this.setState({
            eventEditDB:{
                ...this.state.eventEditDB,
                [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value
            }
        });
    }

    handleSave = () => {
        this.setState({ loading: true });
        const { id } = this.props.match.params;
        this.state.eventEditDB.start_date = new Date(this.state.eventEditDB.start_date);

        const data = {
            title: this.state.eventEditDB.title,
            description: this.state.eventEditDB.description,
            cover: this.state.imageSRC || this.state.eventEditDB.cover,
            permission: this.state.eventEditDB.permission ? 1 : 0,
            members_limit: this.state.eventEditDB.members_limit_checked ? this.state.eventEditDB.members_limit : null,
            category_id: this.state.eventEditDB.category_id,
            location: this.state.eventEditDB.location,
            start_date: this.state.eventEditDB.start_date.getFullYear() + "."
                + ("0" + (this.state.eventEditDB.start_date.getMonth() + 1)).slice(-2) +
                "." + ("0" + (this.state.eventEditDB.start_date.getDate())).slice(-2)
                + " " + ("0" + (this.state.eventEditDB.start_date.getHours())).slice(-2) +
                ":" + ("0" + (this.state.eventEditDB.start_date.getMinutes())).slice(-2)
        };

        axios.put("/api/event/" + id, data)
            .then(res => {
                this.setState({
                    loading: false,
                    id: res.data.id
                });
                this.props.history.push({ pathname: "/event/" + id});
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

    handleUpdateStartDate = date => {
        this.setState({
            eventEditDB:{
                ...this.state.eventEditDB,
                start_date: date
            }
        });
    };

    handleGeosuggestChange = location => {
        if ( !location ) {
            return;
        }
        this.setState({
            eventEditDB:{
                ...this.state.eventEditDB,
                location: location.label
            }
        });
    };

    render() {
        const { eventEditDB, categories } = this.state;
        const { isAuthenticated } = this.props;

        if (this.state.loading) {
            return (<Spinner className="events-page"/>);
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
                <div className="edit-event-page">
                    <form className="edit-event-page-content">
                        <div className="edit-event-page-text-block">
                            <Typography variant="h4" className="edit-event-page-typography">
                                Edit event title:
                            </Typography>
                            <div className="edit-event-page-text-field">
                                <TextField
                                    className="edit-event-page-text-field"
                                    margin="normal"
                                    name="title"
                                    variant="filled"
                                    min="3"
                                    inputProps={{ maxLength: 100 }}
                                    autoComplete="off"
                                    fullWidth
                                    multiline
                                    value={eventEditDB.title}
                                    onChange={event => this.handleUpdateData(event)}
                                    error={this.state.errors.title}
                                />
                            </div>
                        </div>

                        <div className="edit-event-page-text-block">
                            <Typography variant="h4" className="edit-event-page-typography">
                                Edit event description:
                            </Typography>
                            <div className="edit-event-page-text-field">
                                <TextField
                                    className="edit-event-page-text-field"
                                    margin="normal"
                                    variant="filled"
                                    name="description"
                                    min="6"
                                    inputProps={{ maxLength: 300 }}
                                    autoComplete="off"
                                    fullWidth
                                    multiline
                                    value={eventEditDB.description}
                                    onChange={event => this.handleUpdateData(event)}
                                    error={this.state.errors.description}
                                />
                            </div>
                        </div>

                        <div className="edit-event-page-text-block">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Typography variant="h4" className="edit-event-page-typography">
                                    Edit date and time:
                                </Typography>
                                <InlineDateTimePicker
                                    ampm={false}
                                    value={eventEditDB.start_date}
                                    onChange={this.handleUpdateStartDate}
                                    className="edit-event-picker"
                                    format="yyyy.MM.dd HH:mm"
                                    error={this.state.errors.start_date}
                                />
                            </MuiPickersUtilsProvider>
                        </div>

                        <div className="edit-event-page-text-block">
                            <Typography variant="h4" className="edit-event-page-typography">
                                Edit location:
                            </Typography>
                            <FormGroup className="edit-event-page-location">
                                <FormControlLabel
                                    labelPlacement="top"
                                    control={
                                        <Geosuggest
                                            name="location"
                                            onActivateFirstSuggest="true"
                                            initialValue={eventEditDB.location}
                                            onSuggestSelect={this.handleGeosuggestChange}
                                            autoActivateFirstSuggest={true}
                                            error={this.state.errors.location}
                                            autoComplete="off"
                                        />
                                    }
                                />
                            </FormGroup>
                        </div>

                        <div className="edit-event-page-text-block">
                            <Typography variant="h4" className="edit-event-page-typography">
                                Edit event permission:
                            </Typography>
                            <FormGroup>
                                <FormControlLabel
                                    className="new"
                                    label="Private event"
                                    control={
                                        <Switch
                                            name="permission"
                                            onChange={event => this.handleUpdateData(event)}
                                            checked={this.state.eventEditDB.permission}
                                        />
                                    }
                                />
                            </FormGroup>
                        </div>

                        <div className="edit-event-page-text-block">
                            <Typography variant="h4" className="edit-event-page-typography">
                                Edit member limit:
                            </Typography>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={this.state.eventEditDB.members_limit_checked}
                                            name="members_limit_checked"
                                            onChange={event => this.handleUpdateData(event)}
                                        />
                                    }
                                />

                                {this.state.eventEditDB.members_limit_checked && <div>
                                    <FormControl className="textField">
                                        <TextField
                                            type="number"
                                            min="1"
                                            name="members_limit"
                                            onChange={event => this.handleUpdateData(event)}
                                            value={this.state.eventEditDB.members_limit || "1"}
                                            fullWidth
                                            autoComplete="off"
                                            error={this.state.errors.members_limit}
                                        />
                                    </FormControl>
                                </div>}
                            </FormGroup>
                        </div>

                        <div className="edit-event-page-text-block">
                            <Typography variant="h4" className="edit-event-page-typography">
                                Edit category:
                            </Typography>
                            <FormControl className="formControl">
                                <NativeSelect
                                    value={this.state.eventEditDB.category_id}
                                    name="category_id"
                                    onChange={event => this.handleUpdateData(event)}
                                    input={<Input name="category_id" />}
                                    className="edit-event-select"
                                >
                                    {categories.map((category) =>
                                        <option value={category.id} selected={category.id === eventEditDB.category_id}>{category.title}</option>
                                    )}
                                </NativeSelect>
                            </FormControl>
                        </div>

                        <div className="edit-event-page-text-block">
                            <Grid container>
                                <Grid item lg={4}>
                                    <Typography variant="h4" className="edit-event-page-typography">
                                        Edit event cover:
                                    </Typography>
                                    <div className="edit-event-page-text-field">
                                        <Button variant="contained" className="edit-event-page-button-upload"
                                                onClick={this.showUploadComponent}
                                        >
                                            <span>Choose</span>
                                        </Button>
                                    </div>
                                </Grid>
                                <Grid item lg={8} className="edit-event-page-current-cover-grid">
                                    <img className="edit-event-page-current-cover" src={this.state.eventEditDB.cover} alt={"event-cover"}/>
                                </Grid>
                            </Grid>
                        </div>
                        <Button
                            className="edit-event-page-save-btn"
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

export default withSnackbar(EditEvent);
