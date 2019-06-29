import React from 'react';
import { connect } from "react-redux";
import { 
    loadRoomDetails,
    editRoom,
    loadRoomCategories, 
    loadRoomTags, 
} from '../../store/actions/rooms';
import { enqueueSnackbar } from '../../store/actions/toast';

import axios from "axios";
import { Button, FormControl, FormControlLabel, FormGroup, Grid, Input, NativeSelect, Switch,
    TextField, Typography } from "@material-ui/core";
import Spinner from "../UI/Spinner/Spinner";
import ImageUploader from "./../ImageUploader/ImageUploader";

const messageType = {
    SUCCESS: "success",
    INFO: "info",
    ERR: "error"
};

class EditRoom extends React.Component {
    state = {
        roomEditDB: null,
        showEditOkMsg: false,
        showUpload: false,
        imageSRC: null,
        errors: {
            title: false,
            description: false,
            members_limit: false,
        }
    };

    getFilteredRoomData = () => {
        const id = this.props.match.params.id;
        const res = this.props.rooms.filter(data => data.id === parseInt(id));
        return res.length > 0 ? res : null;
    };
    componentDidUpdate() {
        if (this.getFilteredRoomData() && !this.state.roomEditDB) {
            this.setState({
                roomEditDB: this.getFilteredRoomData()[0]
            });
        } else if (
            this.getFilteredRoomData() &&
            this.getFilteredRoomData()[0].wasEdited &&
            this.state.showEditOkMsg
        ) {
            this.props.history.push({ pathname: "/room/" + this.props.match.params.id });
            this.props.showToast('Changes saved!', messageType.SUCCESS);
        }
    }
    componentDidMount() {
        const { id } = this.props.match.params;

        // If no room data, load it;
        if (id && !this.getFilteredRoomData()) {
            this.props.loadRoomData(id);
        } else if (this.getFilteredRoomData() && !this.state.roomEditDB) {
            this.setState({
                roomEditDB: this.getFilteredRoomData()[0]
            });
        }

        // In case we have 0 categories, reload them;
        if (this.props.categories.length <= 0) {
            this.props.loadCatogories();
        }

        // In case we have 0 tags, load them;
        // @todo display in UI tags;
        if (this.props.tags.length <= 0) {
            this.props.loadTags();
        }
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
        // Allow show all ok message;
        this.setState({ showEditOkMsg: true });

        const { id } = this.props.match.params;

        const data = {
            title: this.state.roomEditDB.title,
            description: this.state.roomEditDB.description,
            cover: this.state.imageSRC || this.state.roomEditDB.cover,
            permission: this.state.roomEditDB.permission ? 1 : 0,
            members_limit: this.state.roomEditDB.members_limit_checked ? this.state.roomEditDB.members_limit : null,
            category_id: this.state.roomEditDB.category_id
        };

        this.props.editRoom(id, data);
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
        const { roomEditDB } = this.state;

        const { isAuthenticated } = this.props;

        if (!this.state.roomEditDB) {
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
                                    {this.props.categories.map((category) =>
                                        <option key={category.id} value={category.id} selected={parseInt(category.id) === parseInt(roomEditDB.category_id)}>{category.title}</option>
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

const mapStateToProps = state => ({
    rooms: state.rooms.rooms,
    categories: state.rooms.categories,
    tags: state.rooms.tags,
    loading: state.rooms.roomsLoading,
    isAuthenticated: state.auth.isAuthenticated
});
  
const mapDispatchToProps = dispatch => ({
    editRoom: (id, data) => dispatch(editRoom(id, data)),
    loadRoomData: id => dispatch(loadRoomDetails(id)),
    loadCatogories: () => dispatch(loadRoomCategories()),
    loadTags: () => dispatch(loadRoomTags()),
    showToast: (message, variant) => dispatch(enqueueSnackbar({
        message,
        options: { variant }
    }))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditRoom);
